const bodyParser = require('./body-parser')
const cors = require('./cors')
const logRequest = require('./log-request')
const error = require('./error')
const routeNotFound = require('./route-not-found')

module.exports = {
  bodyParser,
  cors,
  logRequest,
  routeNotFound,
  error
}
