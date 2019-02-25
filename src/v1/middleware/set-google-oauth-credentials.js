const oauth2Client = require('../config/google')

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
    oauth2Client.setCredentials(currentUser.google)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = setGoogleOAuthCredentials
