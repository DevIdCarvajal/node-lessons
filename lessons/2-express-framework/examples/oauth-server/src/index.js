// ------- Módulos y configuración -------

const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieSession = require('cookie-session')
require('dotenv').config()

const apiRouter = require('./routes')
require('./config/db')
require('./config/passport')

const server = express()
const PORT = process.env.PORT || 4000

// ------- Middlewares -------

server.use(
  cors({
    origin: true,
    credentials: true
  })
)
server.use(express.json())
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // Milisegundos de un día
    keys: [process.env.COOKIE_KEY || 'express-auth-cookie']
  })
)

server.use(passport.initialize())
server.use(passport.session())

// ------- Endpoints -------

server.use('/api', apiRouter)

// ------- Manejo de errores -------

server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

// ------- Iniciar el servidor -------

server.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://locahost:${PORT}`)
})
