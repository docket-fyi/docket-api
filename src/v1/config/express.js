const express = require('express')
const app = express()

// require('./db')
const routes = require('../routes')
const {
  bodyParser,
  cors,
  logRequest,
  routeNotFound,
  error,
  logResponse
} = require('../middleware')

app.use(cors())
app.use(bodyParser.json())
app.use(logRequest)
app.use('/v1', routes)
app.use(routeNotFound)
app.use(error)
app.use(logResponse)

module.exports = app
