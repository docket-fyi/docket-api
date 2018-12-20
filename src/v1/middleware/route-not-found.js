const status = require('http-status')

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
  if (res.headersSent) {
    return next()
  }
  const json = {
    errors: [
      {
        name: status[404],
        message: `The route ${req.method} ${req.originalUrl} does not exist`
      }
    ]
  }
  res.status(status.NOT_FOUND).json(json)
  next()
}

module.exports = routeNotFound
