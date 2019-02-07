const oauth2Client = require('../config/google')

/**
 * Clears/resets the Google OAuth credentials on the OAuth client object.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function clearGoogleOAuthCredentials(req, res, next) {
  try {
    oauth2Client.setCredentials({})
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = clearGoogleOAuthCredentials
