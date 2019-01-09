const status = require('http-status')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const moment = require('moment')

const environment = require('../environment')
const { User } = require('../../models')
const {
  RegistrationConfirmationCodeMissingError,
  UserNotFoundError,
  UserAlreadyConfirmedError,
  ForgotPasswordEmailMissingError,
  UserNotConfirmedError,
  PasswordResetMissingCodeError,
  PasswordResetMissingPasswordError,
  PasswordResetMismatchError,
  PasswordResetSamePasswordError
} = require('../errors')
const {
  sendRegistrationConfirmationEmail,
  sendPasswordResetEmail
} = require('../util')

/**
 * Fetches all users from the database and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function index(req, res, next) {
  try {
    const fields = {
      _id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false
    }
    const users = await User.find({}, fields).exec()
    res.status(status.OK).json(users)
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Attemps to find a user and, if found, returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function show(req, res, next) {
  try {
    const { user } = req
    res.status(status.OK).json(user)
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Attempts to create a new user and, if valid, saves it to the database,
 * and returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function create(req, res, next) {
  const { body } = req
  const { firstName, lastName, email, password } = body
  try {
    const hashedPassword = bcrypt.hashSync(password, 10) // eslint-disable-line no-sync
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    const json = {
      id: newUser.id,
      firstName,
      lastName,
      email
    }
    await sendRegistrationConfirmationEmail(req, newUser)
    res.status(status.OK).json(json)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to update a user and, if found and valid, returns the newly
 * updated user.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function update(req, res, next) {
  try {
    const { currentUser, body } = req
    const { firstName, lastName, email } = body
    currentUser.set({
      firstName,
      lastName,
      email
    })
    const updatedUser = await currentUser.save()
    const json = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email
    }
    res.status(status.OK).json(json)
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Attempts to find a user and, if found, deletes it from the database.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function destroy(req, res, next) {
  try {
    const { currentUser } = req
    const { id } = currentUser
    await User.remove({ _id: id })
    res.status(status.NO_CONTENT).send()
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Given a confirmation code, attempts to verify user registration.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function confirmRegistration(req, res, next) {
  try {
    const { params } = req
    const { code } = params
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new RegistrationConfirmationCodeMissingError()
    }
    const jwt = jsonWebToken.verify(code, environment.registrationConfirmation.secret)
    const user = await User.findOne({ _id: jwt.id }).exec()
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new UserNotFoundError()
    }
    if (user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new UserAlreadyConfirmedError()
    }
    user.set({ confirmedAt: moment() })
    await user.save()
    res.status(status.NO_CONTENT).send()
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
 *
 * @return {Promise<undefined>}
 */
async function forgotPassword(req, res, next) {
  try {
    const { body } = req
    const { email } = body
    if (!email) {
      res.status(status.BAD_REQUEST)
      throw new ForgotPasswordEmailMissingError()
    }
    const user = await User.findOne({ email }).exec()
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new UserNotFoundError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new UserNotConfirmedError()
    }
    await sendPasswordResetEmail(req, user)
    res.status(status.NO_CONTENT).send()
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
 *
 * @return {Promise<undefined>}
 */
async function resetPassword(req, res, next) {
  try {
    const { body } = req
    const { code, password, passwordConfirmation } = body
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new PasswordResetMissingCodeError()
    }
    if (!password || !passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new PasswordResetMissingPasswordError()
    }
    if (password !== passwordConfirmation) {
      res.status(status.BAD_REQUEST)
      throw new PasswordResetMismatchError()
    }
    const jwt = jsonWebToken.verify(code, environment.passwordReset.secret)
    const user = await User.findOne({ _id: jwt.id }).exec()
    if (!user) {
      res.status(status.NOT_FOUND)
      throw new UserNotFoundError()
    }
    const isSamePassword = bcrypt.compareSync(password, user.password) // eslint-disable-line no-sync
    if (isSamePassword) {
      res.status(status.BAD_REQUEST)
      throw new PasswordResetSamePasswordError()
    }
    if (!user.confirmedAt) {
      res.status(status.BAD_REQUEST)
      throw new UserNotConfirmedError()
    }
    const hashedPassword = bcrypt.hashSync(password, 10) // eslint-disable-line no-sync
    user.set({ password: hashedPassword })
    await user.save()
    res.status(status.NO_CONTENT).send()
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  // index,
  // show,
  create,
  // update,
  // destroy,
  confirmRegistration,
  forgotPassword,
  resetPassword
}
