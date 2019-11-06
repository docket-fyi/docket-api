const status = require('http-status')

const errors = require('../errors')
const jsonApi = require('../config/json-api')

/**
 * Per the JSON:API specification, servers MUST respond with a
 * 406 Not Acceptable status code if a request’s Accept header contains
 * the JSON:API media type and all instances of that media type are
 * modified with media type parameters.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return  {undefined}
 * @see https://jsonapi.org/format/#content-negotiation-servers
 */
function jsonApiNotAcceptable(req, res, next) {
  const accept = req.get('accept') || ''
  const acceptValues = accept.split(',').map(value => value.trim())
  const jsonApiValues = acceptValues.filter(value => value.includes(jsonApi.contentType))
  const acceptable = jsonApiValues.every(value => value === jsonApi.contentType)
  if (acceptable) {
    return next()
  }
  res.status(status.NOT_ACCEPTABLE)
  const err = new errors.jsonApi.NotAcceptableError()
  return next(err)
}

module.exports = jsonApiNotAcceptable
