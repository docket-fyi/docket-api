const status = require('http-status')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const Sentry = require('@sentry/node')

// const environment = require('../environment')
const Secret = require('../config/secret')
const { getUserModel } = require('../models')
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
 *     security: []
 *     tags:
 *       - Sessions
 *     requestBody:
 *       description: Session creation parameters
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - attributes
 *                 properties:
 *                   attributes:
 *                     type: object
 *                     required:
 *                       - email
 *                       - password
 *                     properties:
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SessionCreateOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
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
    const User = await getUserModel()
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
    const jwtSecrets = await Secret.get('jwt')
    const options = {
      expiresIn: jwtSecrets.JWT_EXPIRATION
    }
    const jwt = jsonWebToken.sign({ id: user.id }, jwtSecrets.JWT_SECRET, options)
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
