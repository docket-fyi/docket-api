const express = require('express')

const { healthCheck } = require('../controllers')

const router = express.Router()

router.get('/health-check', healthCheck.index)

module.exports = router
