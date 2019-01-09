const status = require('http-status')

/**
 * Health check
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function index(req, res, next) {
  try {
    res.status(status.OK).json({success: true})
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index
}
