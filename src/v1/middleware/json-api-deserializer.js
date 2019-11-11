const Deserializer = require('jsonapi-serializer').Deserializer

/**
 * Logs the HTTP request.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
async function jsonApiDeserializer(req, res, next) {
  try {
    const { body } = req
    const opts = {
      keyForAttribute: 'camelCase'
    }
    const deserializer = new Deserializer(opts)
    const deserializedBody = await deserializer.deserialize(body)
    req.deserializedBody = deserializedBody // eslint-disable-line require-atomic-updates
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = jsonApiDeserializer
