const express = require('express')

const { auth } = require('../controllers')

const router = express.Router()

router.post('/auth', auth.create)

module.exports = router
