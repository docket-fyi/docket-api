const status = require('http-status')

const swaggerSpec = require('../swagger.json')

/**
 * Returns an Open API (Swagger) compliant spec.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {undefined}
 */
function index(req, res, next) {
  try {
    res.status(status.OK).json(swaggerSpec)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index
}
