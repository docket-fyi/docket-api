const status = require('http-status')

// const { Locale } = require('../../models')

/**
 * Fetches all translations from the database and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function index(req, res, next) {
  try {
    const locales = await Locale.find().exec()
    res.status(status.OK).json(locales)
    return next()
  } catch (err) {
    return next(err)
  }
}*/

/**
 * Attemps to find a locale and, if found, returns all translations.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getLocale(req, res, next) {
  try {
    const { locale } = req
    res.status(status.OK).json(locale.translations)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to create a new translation for a specified locale and, if
 * valid, saves it to the database, and returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 *
async function create(req, res, next) {
  const { body } = req
  const { code, ... } = body
  try {
    const newLocale = await Locale.create({
      code
    })
    const json = {
      id: newUser.id,
      code,
    }
    res.status(status.OK).json(json)
    return next()
  } catch (err) {
    return next(err)
  }
}*/

/**
 * Attempts to update a translations and, if found and valid, returns the
 * newly updated translation.
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
}*/

/**
 * Attempts to find a translation and, if found, deletes it from the database.
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
}*/

module.exports = {
  // index,
  getLocale
  // create,
  // update,
  // destroy
}
