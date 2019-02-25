const express = require('express')

const { auth } = require('../controllers')
const validations = require('./validations').auth

const router = express.Router()

router.post('/auth', validations['/auth'].post, auth.create)

module.exports = router
