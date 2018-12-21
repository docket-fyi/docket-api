const express = require('express')

const { docs } = require('../controllers')

const router = express.Router()

router.get('/docs', docs.index)

module.exports = router
