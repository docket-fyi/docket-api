const express = require('express')

const { google } = require('../controllers')

const router = express.Router()

router.get('/google/url', google.getOAuthUrl)
router.get('/google/tokens', google.getAccessTokens)

module.exports = router
