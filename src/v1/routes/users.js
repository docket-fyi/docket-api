const express = require('express')

const { users } = require('../controllers')
const { jsonApiDeserializer } = require('../middleware')
const validations = require('./validations').users

const router = express.Router()

router.post('/users', validations['/users'].post, jsonApiDeserializer, users.create)
router.post('/users/confirm-registration', validations['/users/confirm-registration'].post, jsonApiDeserializer, users.confirmRegistration)
router.post('/users/forgot-password', validations['/users/forgot-password'].post, jsonApiDeserializer, users.forgotPassword)
router.post('/users/reset-password', validations['/users/reset-password'].post, jsonApiDeserializer, users.resetPassword)

module.exports = router
