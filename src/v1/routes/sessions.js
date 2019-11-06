const express = require('express')

const { sessions } = require('../controllers')
const validations = require('./validations').sessions
const { jsonApiDeserializer } = require('../middleware')

const router = express.Router()

router.post('/sessions', validations['/sessions'].post, jsonApiDeserializer, sessions.create)

module.exports = router
