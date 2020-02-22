const Sentry = require('@sentry/node')

const logger = require('./logger')
const Secret = require('./secret')

// const environment = require('../environment')

async function init() {
  const dsn = await Secret.get('sentry', 'SENTRY_DSN')
  const environment = process.env.NODE_ENV || 'development'
  logger.info('Initializing Sentry...')
  Sentry.init({
    dsn,
    environment
  })
  logger.info('Initialized Sentry.')
}

module.exports = {
  init
}
