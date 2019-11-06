const status = require('http-status')

const errors = require('../errors')
const jsonApi = require('../config/json-api')

/**
 * Per the JSON:API specification, servers MUST respond with a
 * 415 Unsupported Media Type status code if a request specifies the
 * header Content-Type: application/vnd.api+json with any media type
 * parameters.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return  {undefined}
 * @see https://jsonapi.org/format/#content-negotiation-servers
 */
function jsonApiUnsupportedMediaType(req, res, next) {
  const { method, body } = req
  if (!['post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) return next() // Ignore HTTP verbs that can't have a request body
  /**
   * HTTP DELETE requests require special care because RFC 7231 specifies
   * that a DELETE request may include a body (in which case, the JSON:API
   * spec requires the Content-Type header to be set):
   *
   * "A payload within a DELETE request message has no defined semantics;
   * sending a payload body on a DELETE request might cause some existing
   * implementations to reject the request."
   *
   * @see https://tools.ietf.org/html/rfc7231#page-29
   */
  if (method.toLowerCase() === 'delete') {
    if (!body) return next() // If there's no body, continue on
    if (Array.isArray(body) && !body.length) return next() // If the body is an array but has no indicies, continue on
    if (!Object.keys(body).length) return next() // If the body is an object but has no keys, continue on
  }
  const contentType = req.get('content-type')
  if (!contentType) return next()
  if (contentType && contentType === jsonApi.contentType) {
    return next()
  }
  res.status(status.UNSUPPORTED_MEDIA_TYPE)
  const err = new errors.jsonApi.UnsupportedMediaTypeError()
  return next(err)
}

module.exports = jsonApiUnsupportedMediaType
