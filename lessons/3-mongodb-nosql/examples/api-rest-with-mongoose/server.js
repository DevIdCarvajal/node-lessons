const express = require('express')
require('dotenv').config()
require('./configs/db')

const server = express()
const port = process.env.PORT || 8080

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/', require('./routes'))

server.use((req, res, next) => {
  next(new Error('Ruta no encontrada'))
})

server.use((req, res) => res.status(404).send('Estos no son los androides que buscas'))

server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))