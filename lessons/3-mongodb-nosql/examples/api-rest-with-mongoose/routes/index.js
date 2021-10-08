const router = require('express').Router()

router.use('/books', require('./books'))
//router.use('/monsters', require('./monsters'))

module.exports = router