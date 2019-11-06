const status = require('http-status')

const { spec } = require('../swagger/spec')

/**
 * Returns an Open API (Swagger) compliant spec. This should NOT use
 * a JSON API serializer since it would make the Swagger/OpenAPI spec
 * invalid.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {undefined}
 * @swagger
 * /docs:
 *   get:
 *     summary: Get the Swagger 2.0 spec
 *     description: Get the Swagger 2.0 spec
 *     operationId: getDocs
 *     tags:
 *       - Docs
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 */
function index(req, res, next) {
  try {
    res.status(status.OK)
    res.body = spec // Don't serialize this
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index
}
