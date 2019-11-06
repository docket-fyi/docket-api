const express = require('express')

const { search } = require('../controllers')
const validations = require('./validations').search
const { verifyJwt, currentUser, setSentryContext } = require('../middleware')

const router = express.Router()

router.get('/search', verifyJwt, validations['/search'].get, currentUser, setSentryContext, search.list)

module.exports = router
