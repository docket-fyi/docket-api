const status = require('http-status')

const errors = require('../errors')

/**
 * Handler for unknown routes.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function routeNotFound(req, res, next) {
  try {
    if (res.headersSent || res.body || res.statusCode === status.NO_CONTENT) {
      return next()
    }
    res.status(status.NOT_FOUND)
    throw new errors.RouteNotFoundError()
  } catch (err) {
    return next(err)
  }
}

module.exports = routeNotFound
