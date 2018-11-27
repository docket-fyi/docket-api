const debug = require('debug')('app:api')

function logRequest(req, res, next) {
  debug(`-> ${req.method} ${req.originalUrl}`)
  next()
}

module.exports = logRequest
