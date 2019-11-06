const status = require('http-status')

const { User } = require('../models')
const errors = require('../errors')

/**
 * Handler for unknown routes.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function currentUser(req, res, next) {
  try {
    const { jwt } = req
    if (!jwt) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.MissingJwtError()
    }
    const { id } = jwt
    if (!id) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.MalformedJwtError()
    }
    const currentUser = await User.findOne({
      where: {
        id
      }
    })
    if (!currentUser) {
      res.status(status.FORBIDDEN)
      throw new errors.users.NotFoundError()
    }
    req.currentUser = currentUser
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = currentUser
