const express = require('express')
const passport = require('passport')

const { isAuthenticated } = require('../middlewares/authentication')

const router = express.Router()

// Acceder al perfil solo si hay una cookie de validación
router.get('/profile', [isAuthenticated], (req, res) => res.status(200).json(req.user))
router.get('/config', [isAuthenticated], (req, res) => res.text("hola buenas tardes"))

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

  // Redirigir a la web cliente tras la autenticación
  res.status(200).redirect(process.env.CLIENT_URL || 'http://localhost:3000')

  // Solo para pruebas del servidor...
  // res.status(200).json({ data: req.user })
})

router.post('/register', passport.authenticate('register'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.post('/login', passport.authenticate('login'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.get('/logout', (req, res) => {
  req.logout() // Método de Passport

  res.status(200).json({ data: 'OK' })
})

module.exports = router
