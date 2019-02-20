const status = require('http-status')

const oauth2Client = require('../config/google')
const { UserNotFoundError } = require('../errors')

/**
 * Sets the Google OAuth credentials on the OAuth client object. It's
 * mandatory that the `currentUser` middleware be called sometime before
 * this middleware.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function setGoogleOAuthCredentials(req, res, next) {
  try {
    const { currentUser } = req
    if (!currentUser) {
      res.status(status.BAD_REQUEST)
      throw new UserNotFoundError()
    }
    oauth2Client.setCredentials(currentUser.google)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = setGoogleOAuthCredentials
