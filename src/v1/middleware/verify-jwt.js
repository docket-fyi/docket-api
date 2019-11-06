const status = require('http-status')
const jsonWebToken = require('jsonwebtoken')

const environment = require('../environment')
const errors = require('../errors')

const PREFIX = 'Bearer ' // The trailing space is intentional

/**
 * Extracts the Authorization header and, if present, verifies the JWT
 * and attaches it to the request object.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function verifyJwt(req, res, next) {
  try {
    const authorizationHeader = req.get('Authorization')
    if (!authorizationHeader) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.AuthorizationHeaderMissingError()
    }
    const hasBearer = authorizationHeader.startsWith(PREFIX)
    if (!hasBearer) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.MalformedAuthorizationHeaderError()
    }
    const rawJwt = authorizationHeader.split(PREFIX)[1]
    const jwt = jsonWebToken.verify(rawJwt, environment.jwt.secret)
    req.rawJwt = rawJwt
    req.jwt = jwt
    return next()
  } catch (err) {
    res.status(status.FORBIDDEN)
    return next(err)
  }
}

module.exports = verifyJwt
