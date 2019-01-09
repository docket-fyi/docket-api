const status = require('http-status')

const { User } = require('../../models')
const { UserNotFoundError, MissingJwtError, MalformedJwtError } = require('../errors')

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
      throw new MissingJwtError()
    }
    const { id } = jwt
    if (!id) {
      res.status(status.BAD_REQUEST)
      throw new MalformedJwtError()
    }
    const fields = {
      __v: false,
      password: false
    }
    const currentUser = await User.findOne({ _id: id }, fields)
    if (!currentUser) {
      res.status(status.NOT_FOUND)
      throw new UserNotFoundError()
    }
    req.currentUser = currentUser
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = currentUser
