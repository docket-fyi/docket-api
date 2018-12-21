const bodyParser = require('./body-parser')
const cors = require('./cors')
const logRequest = require('./log-request')
const logResponse = require('./log-response')
const error = require('./error')
const routeNotFound = require('./route-not-found')
const verifyJwt = require('./verify-jwt')
const currentUser = require('./current-user')

module.exports = {
  bodyParser,
  cors,
  logRequest,
  logResponse,
  routeNotFound,
  error,
  verifyJwt,
  currentUser
}
