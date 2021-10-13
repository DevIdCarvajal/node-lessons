const mongoose = require('mongoose')

const DB_URI = process.env.DBHOST || 'mongodb://localhost:27017/express-auth'

mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`Conectado contra la base de datos: ${DB_URI}`)
  })
  .catch(error => {
    console.log(`Error de conexión contra la base de datos: ${error}`)
  })
