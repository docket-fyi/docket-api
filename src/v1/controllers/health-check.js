const status = require('http-status')
const Sentry = require('@sentry/node')

const serializers = require('../serializers')

/**
 * Health check
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /health-check:
 *   get:
 *     summary: Health check
 *     description: Checks the health of the application
 *     operationId: listHealthCheck
 *     consumes:
 *       - application/vnd.api+json
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         $ref: '#/responses/HealthCheckListOkResponse'
 */
async function list(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'healthCheck')
    scope.setTag('action', 'list')
  })
  try {
    res.status(status.OK)
    const data = {
      success: true
    }
    res.body = serializers.healthCheck.list.serialize(data)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  list
}
