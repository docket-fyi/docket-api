const jsonApi = require('../config/json-api')

/**
 * Sets the Content-Type response header to the appropriate value
 * for JSON:API.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function setJsonApiContentType(req, res, next) {
  res.set('content-type', jsonApi.contentType)
  return next()
}

module.exports = setJsonApiContentType
