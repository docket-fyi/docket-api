const status = require('http-status')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

/**
 * Fetches all users from the database and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
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
 * @return  {Promise<undefined>}
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
 * @return  {Promise<undefined>}
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
 * @return  {Promise<undefined>}
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
 * @return  {Promise<undefined>}
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

module.exports = {
  // index,
  // show,
  create,
  // update,
  // destroy
}
