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
 *     summary: Get the OpenAPI 3.x spec
 *     description: Get the OpenAPI 3.x spec
 *     operationId: getDocs
 *     security: []
 *     tags:
 *       - Docs
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/vnd.api+json:
 *             schema:
 *               type: object
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
