const debug = require('../config/debug').api

/**
 * Logs the HTTP request.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function logRequest(req, res, next) {
  debug(`<- ${req.method} ${req.originalUrl}`)
  next()
}

module.exports = logRequest
