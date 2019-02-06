const status = require('http-status')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')

const environment = require('../environment')
const { User } = require('../../models')
const {
  InvalidLoginError,
  MissingAuthParamError,
  UserNotConfirmedError
} = require('../errors')

/**
 * Attempts to find and authenticate a user and, if valid, returns a JWT.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function create(req, res, next) {
  try {
    const { body } = req
    const { email, password } = body
    if (!email || !password) {
      res.status(status.BAD_REQUEST)
      throw new MissingAuthParamError()
    }
    const user = await User.findOne({ email })
    if (!user) {
      res.status(status.BAD_REQUEST)
      throw new InvalidLoginError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new UserNotConfirmedError()
    }
    const isValidLogin = bcrypt.compareSync(password, user.password) // eslint-disable-line no-sync
    if (!isValidLogin) {
      res.status(status.BAD_REQUEST)
      throw new InvalidLoginError()
    }
    const options = {
      expiresIn: environment.jwt.expiration
    }
    const jwt = jsonWebToken.sign({ id: user.id }, environment.jwt.secret, options)
    res.status(status.OK).json({ jwt })
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  create
}
