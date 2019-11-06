const status = require('http-status')

/**
 * Error handler.
 *
 * @param {Error} err The error instance
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function error(err, req, res, next) {
  /**
   * The default status code is 200 if not set, but if this error
   * middleware has been invoked, obviously things are not OK. If a
   * previous middleware has set the status code, it will bypass this
   * check.
   *
   * @see https://github.com/expressjs/express/issues/3828
   */
  if (res.statusCode === status.OK) {
    res.status(status.INTERNAL_SERVER_ERROR)
  }
  res.body = {
    errors: [
      {
        name: err.name || 'UnknownError',
        message: err.message || 'An unknown error occurred',
        translationKey: err.translationKey || err.message || 'An unknown error occurred',
        method: req.method,
        originalUrl: req.originalUrl
        // date: err.date || new Date(),
        // code: err.code
      }
    ]
  }
  return next()
}

module.exports = error
