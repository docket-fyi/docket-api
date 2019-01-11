const status = require('http-status')

const environment = require('../environment')
const { GoogleOAuthMissingAuthorizationCodeError } = require('../errors')
const oauth2Client = require('../config/google')

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getOAuthUrl(req, res, next) {
  try {
    const url = oauth2Client.generateAuthUrl({
      scope: environment.google.scopes()
    })
    res.status(status.OK).json({ url })
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return {Promise<undefined>}
 */
async function getAccessTokens(req, res, next) {
  try {
    const { query } = req
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new GoogleOAuthMissingAuthorizationCodeError()
    }
    const { tokens } = await oauth2Client.getToken(code)
    res.status(status.OK).json({ tokens })
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getOAuthUrl,
  getAccessTokens
}
