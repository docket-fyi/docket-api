const bodyParser = require('./body-parser')
const cors = require('./cors')
const currentLocale = require('./current-locale')
const setGoogleOAuthCredentials = require('./set-google-oauth-credentials')
const clearGoogleOAuthCredentials = require('./clear-google-oauth-credentials')
const logRequest = require('./log-request')
const logResponse = require('./log-response')
const error = require('./error')
const routeNotFound = require('./route-not-found')
const verifyJwt = require('./verify-jwt')
const currentUser = require('./current-user')
const socketIO = require('./socket-io')

module.exports = {
  bodyParser,
  cors,
  currentLocale,
  setGoogleOAuthCredentials,
  clearGoogleOAuthCredentials,
  logRequest,
  logResponse,
  routeNotFound,
  error,
  verifyJwt,
  currentUser,
  socketIO
}
