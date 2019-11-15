const status = require('http-status')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const Sentry = require('@sentry/node')

const environment = require('../environment')
const { User } = require('../models')
const serializers = require('../serializers')
const errors = require('../errors')

/**
 * Attempts to find and authenticate a user and, if valid, returns a JWT.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new session
 *     description: Create a new session and, if valid, returns an authentication token (JWT)
 *     operationId: createSession
 *     consumes:
 *       - application/vnd.api+json
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Sessions
 *     parameters:
 *       - $ref: '#/parameters/SessionCreateBodyParameter'
 *     responses:
 *       200:
 *         $ref: '#/responses/SessionCreateOkResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function create(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'sessions')
    scope.setTag('action', 'create')
  })
  try {
    const { deserializedBody } = req
    const { email, password } = deserializedBody
    if (!email || !password) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.InvalidLoginError()
    }
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.InvalidLoginError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.NotConfirmedError()
    }
    const isValidLogin = bcrypt.compareSync(password, user.passwordDigest) // eslint-disable-line no-sync
    if (!isValidLogin) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.InvalidLoginError()
    }
    const options = {
      expiresIn: environment.jwt.expiration
    }
    const jwt = jsonWebToken.sign({ id: user.id }, environment.jwt.secret, options)
    res.status(status.OK)
    res.body = serializers.sessions.create.serialize({ jwt })
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  create
}
