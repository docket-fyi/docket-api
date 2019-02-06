const bodyParser = require('./body-parser')
const cors = require('./cors')
const currentLocale = require('./current-locale')
const logRequest = require('./log-request')
const logResponse = require('./log-response')
const error = require('./error')
const routeNotFound = require('./route-not-found')
const verifyJwt = require('./verify-jwt')
const currentUser = require('./current-user')

module.exports = {
  bodyParser,
  cors,
  currentLocale,
  logRequest,
  logResponse,
  routeNotFound,
  error,
  verifyJwt,
  currentUser
}
