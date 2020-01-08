const status = require('http-status')
const Sentry = require('@sentry/node')
const fetch = require('node-fetch')

const serializers = require('../serializers')
// const vault = require('../config/vault')
// const elasticsearch = require('../config/elasticsearch')
const redis = require('../config/redis').primary
const sequelize = require('../config/sequelize')

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
 *     security: []
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         $ref: '#/components/responses/HealthCheckListOkResponse'
 */
async function list(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'healthCheck')
    scope.setTag('action', 'list')
  })

  let isApiHealthy = true
  let isVaultHealthy = true
  let isElasticsearchHealthy = true
  let isPostgresHealthy = false
  let isRedisHealthy = redis.status === 'ready'
  let isStripeHealthy = false
  let errors = []

  /*
  try {
    const response = await vault.health()
    isVaultHealthy = response.initialized
  } catch (err) {
    errors.push({message: err.message || err.toString(), name: err.name || err.toString()})
    isVaultHealthy = false
  }
  */

  /*
  try {
    const response = await elasticsearch.cat.health({h: 'status'}) // eslint-disable-line id-length
    isElasticsearchHealthy = response.statusCode === 200 && response.body.trim() === 'green'
  } catch (err) {
    errors.push({message: err.message || err.toString(), name: err.name || err.toString()})
    isElasticsearchHealthy = false
  }
  */

  try {
    await sequelize.authenticate() // Resolves with `undefined` if successful, otherwise rejects
    isPostgresHealthy = true
  } catch (err) {
    errors.push({message: err.message || err.toString(), name: err.name || err.toString()})
    isPostgresHealthy = false
  }

  try {
    const response = await fetch('https://status.stripe.com/current')
    const responseJson = await response.json()
    isStripeHealthy = responseJson.largestatus === 'up'
  } catch (err) {
    errors.push({message: err.message || err.toString(), name: err.name || err.toString()})
    isStripeHealthy = false
  }

  const data = {
    api: isApiHealthy,
    vault: isVaultHealthy,
    elasticsearch: isElasticsearchHealthy,
    redis: isRedisHealthy,
    postgres: isPostgresHealthy,
    stripe: isStripeHealthy,
    errors
  }
  const allHealthy = Object.values(data).every(value => value)
  const overallStatus = allHealthy
    ? status.OK
    : status.SERVICE_UNAVAILABLE
  res.status(overallStatus)
  res.body = serializers.healthCheck.list.serialize(data)
  return next()
}

module.exports = {
  list
}
