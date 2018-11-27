const express = require('express')
const app = express()

require('./db')
const routes = require('../routes')

const {
  bodyParser,
  cors,
  logRequest,
  routeNotFound,
  error
} = require('../middleware')

app.use(cors())
app.use(bodyParser.json())
app.use(logRequest)
app.use('/v1', routes.devices)
app.use('/v1', routes.events)
app.use(routeNotFound)
app.use(error)

module.exports = app
