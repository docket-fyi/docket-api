const arena = require('./arena')
const jsonBodyParser = require('./body-parser')
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
const pino = require('./pino.js')
const sentryRequestHandler = require('./sentry-request')
const sentryErrorHandler = require('./sentry-error')
const setSentryContext = require('./set-sentry-context')
const jsonApiDeserializer = require('./json-api-deserializer')
const jsonApiUnsupportedMediaType = require('./json-api-unsupported-media-type')
const jsonApiNotAcceptable = require('./json-api-not-acceptable')
const sendJsonResponse = require('./send-json-response')
const setJsonApiContentType = require('./json-api-content-type')

module.exports = {
  arena,
  jsonBodyParser,
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
  socketIO,
  pino,
  sentryRequestHandler,
  sentryErrorHandler,
  jsonApiDeserializer,
  jsonApiUnsupportedMediaType,
  jsonApiNotAcceptable,
  sendJsonResponse,
  setJsonApiContentType,
  setSentryContext
}
