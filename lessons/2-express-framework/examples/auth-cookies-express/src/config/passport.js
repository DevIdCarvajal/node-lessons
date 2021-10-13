const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const User = require('../models/User')

// Referencia: https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/redirect'
    },
    (_accessToken, _refreshToken, profile, done) => {
      
      // Datos de la cuenta de Google del usuario
      const { id: googleId, displayName, name, emails } = profile
      const { value: email } = emails[0]

      // Buscar al usuario con el googleId y si no existe crearlo
      User.findOne({ email })
        .then((user) => {
          
          // Crear y cifrar una contraseña aleatoria
          const salt = bcrypt.genSaltSync(12)
          const hash = bcrypt.hashSync(uuid(), salt)

          // Si el usuario existe en la base de datos, logarlo con una cookie
          if (!user) {
            const newUser = new User({
              email,
              googleId,
              password: hash
            })

            newUser.save().then(() => {
              done(null, newUser)
            })
          } else {
            done(null, user)
          }
        })
        .catch((err) => done(err, null))
    }
  )
)

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // Si el usuario no existe en la base de datos, registrarlo
          if (!user) {
            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(password, salt)

            const newUser = new User({
              email,
              password: hash
              // ...
            })

            newUser
              .save()
              .then(() => done(null, newUser))
              .catch((err) => done(err, null))
          } else {
            throw new Error('El usuario ya existe')
          }
        })
        .catch((err) => done(err, null))
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          
          if (!user) {
            throw new Error('El usuario no existe')
          }

          const userPassword = user.get('password')
          const isValidPassword = bcrypt.compareSync(password, userPassword)

          if (!isValidPassword) {
            throw new Error('Email y/o contraseña incorrectos')
          }

          done(null, user)
        })
        .catch((err) => done(err, null))
    }
  )
)

// Crear una cookie a partir del id de usuario
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Coger la cookie de la respuesta y convertirla en un usuario
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user))
})
