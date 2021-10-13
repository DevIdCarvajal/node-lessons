const express = require('express')

const authRouter = require('./auth')

const router = express.Router()

router.get('/', (req, res) => res.sendStatus(200))
router.use('/auth', authRouter)

module.exports = router
