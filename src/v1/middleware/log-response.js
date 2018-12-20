const debug = require('../config/debug').api

/**
 * Logs the HTTP response.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function logResponse(req, res, next) {
  debug(`<- ${req.method} ${req.originalUrl} (${res.statusCode} ${res.statusMessage})`)
  next()
}

module.exports = logResponse
