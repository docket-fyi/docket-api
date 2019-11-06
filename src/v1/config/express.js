const express = require('express')

require('./sequelize')
const routes = require('../routes')
const {
  jsonBodyParser,
  cors,
  currentLocale,
  routeNotFound,
  error,
  socketIO,
  pino,
  sentryRequestHandler,
  sentryErrorHandler,
  jsonApiUnsupportedMediaType,
  jsonApiNotAcceptable,
  sendJsonResponse,
  setJsonApiContentType
} = require('../middleware')

const app = express()

app.use(sentryRequestHandler)
app.use(cors)
app.use(jsonBodyParser)
app.use(jsonApiUnsupportedMediaType)
app.use(jsonApiNotAcceptable)
app.use(currentLocale)
app.use(pino)
app.use(socketIO)
app.use('/v1', routes)
app.use(routeNotFound)
app.use(setJsonApiContentType)
app.use(sentryErrorHandler)
app.use(error)
app.use(sendJsonResponse)

module.exports = app
