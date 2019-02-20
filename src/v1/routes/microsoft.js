const express = require('express')

const { verifyJwt, currentUser } = require('../middleware')
const { microsoft } = require('../controllers')

const router = express.Router()

router.get('/microsoft/oauth-url', verifyJwt, currentUser, microsoft.getOAuthUrl)
router.get('/microsoft/tokens', verifyJwt, currentUser, microsoft.getAccessTokens)

module.exports = router
