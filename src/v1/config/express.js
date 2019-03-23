const express = require('express')

require('./db')
const routes = require('../routes')
const {
  bodyParser,
  cors,
  currentLocale,
  logRequest,
  routeNotFound,
  error,
  logResponse,
  socketIO
} = require('../middleware')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(currentLocale)
app.use(logRequest)
app.use(socketIO)
app.use('/v1', routes)
app.use(routeNotFound)
app.use(error)
app.use(logResponse)

module.exports = app
