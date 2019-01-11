const { google } = require('googleapis')

const environment = require('../environment')

const {
  clientId,
  clientSecret,
  redirectUrl
} = environment.google

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl)

module.exports = oauth2Client
