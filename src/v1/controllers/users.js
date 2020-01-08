/* eslint-disable max-lines */

const Sentry = require('@sentry/node')
const status = require('http-status')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const moment = require('moment')
const uuid = require('uuid/v4')

const environment = require('../environment')
const { User } = require('../models')
const serializers = require('../serializers')
const errors = require('../errors')
const {
  sendRegistrationConfirmationEmailQueue,
  sendPasswordResetEmailQueue
  // sendWelcomeEmailQueue
} = require('../config/queues')

/**
 * Attempts to create a new user and, if valid, saves it to the database,
 * and returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user and, if valid, return it
 *     operationId: createUser
 *     security: []
 *     tags:
 *       - Users
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserCreateBodyParameter'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/UserCreateCreatedResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function create(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'users')
    scope.setTag('action', 'create')
  })
  const { deserializedBody } = req
  const { firstName, lastName, email } = deserializedBody
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      preferredMeasurementUnit: 'd',
      uuid: uuid()
    })
    await sendRegistrationConfirmationEmailQueue.add({
      referrer: req.get('Referrer'),
      user
    })
    res.body = serializers.users.create.serialize(user)
    // res.set({'Location': `/v1/users/${user.id}`})
    res.status(status.CREATED)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Given a confirmation code, attempts to verify user registration.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /users/confirm-registration:
 *   post:
 *     summary: Confirm a new user's registration
 *     description: Confirm a new user's registration
 *     operationId: confirmRegistration
 *     security: []
 *     tags:
 *       - Users
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserConfirmRegistrationBodyParameter'
 *     parameters:
 *       - $ref: '#/components/parameters/UserConfirmRegistrationCodeParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function confirmRegistration(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'users')
    scope.setTag('action', 'confirmRegistration')
  })
  try {
    const { query, deserializedBody } = req
    const { password, passwordConfirmation } = deserializedBody
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.RegistrationConfirmationCodeMissingError()
    }
    if (!password || !passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetMissingPasswordError()
    }
    if (password !== passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetMismatchError()
    }
    const jwt = jsonWebToken.verify(code, environment.registrationConfirmation.secret)
    const user = await User.findOne({
      where: {
        id: jwt.id
      }
    })
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new errors.users.NotFoundError()
    }
    if (user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.AlreadyConfirmedError()
    }
    if (user.passwordDigest) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.AlreadySetPasswordError()
    }
    const hashedPassword = bcrypt.hashSync(password, 10) // eslint-disable-line no-sync
    user.set({
      confirmedAt: moment(),
      passwordDigest: hashedPassword
    })
    await user.save()
    // await sendWelcomeEmailQueue.add({user})
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Given an email, will send an email to a user to facilitate resetting
 * their password.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Facilitates a user to reset their password
 *     description: Facilitates a user to reset their password
 *     operationId: forgotPassword
 *     security: []
 *     tags:
 *       - Users
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserForgotPasswordBodyParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function forgotPassword(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'users')
    scope.setTag('action', 'forgotPassword')
  })
  try {
    const { deserializedBody } = req
    const { email } = deserializedBody
    if (!email) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.ForgotPasswordEmailMissingError()
    }
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new errors.users.NotFoundError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.NotConfirmedError()
    }
    await sendPasswordResetEmailQueue.add({
      referrer: req.get('Referrer'),
      user
    })
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Given a confirmation code, attempts to verify user registration.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     description: Reset a user's password
 *     operationId: resetPassword
 *     security: []
 *     tags:
 *       - Users
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserResetPasswordBodyParameter'
 *     parameters:
 *       - $ref: '#/components/parameters/UserResetPasswordCodeParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function resetPassword(req, res, next) {

  Sentry.configureScope(scope => {
    scope.setTag('controller', 'users')
    scope.setTag('action', 'resetPassword')
  })
  try {
    const { deserializedBody, query } = req
    const { password, passwordConfirmation } = deserializedBody
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetMissingCodeError()
    }
    if (!password || !passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetMissingPasswordError()
    }
    if (password !== passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetMismatchError()
    }
    const jwt = jsonWebToken.verify(code, environment.passwordReset.secret)
    const user = await User.findOne({
      where: {
        id: jwt.id
      }
    })
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new errors.users.NotFoundError()
    }
    const isSamePassword = bcrypt.compareSync(password, user.passwordDigest) // eslint-disable-line no-sync
    if (isSamePassword) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.PasswordResetSamePasswordError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new errors.users.NotConfirmedError()
    }
    const hashedPassword = bcrypt.hashSync(password, 10) // eslint-disable-line no-sync
    user.set({ passwordDigest: hashedPassword })
    await user.save()
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  create,
  confirmRegistration,
  forgotPassword,
  resetPassword
}
