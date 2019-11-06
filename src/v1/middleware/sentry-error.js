const Sentry = require('@sentry/node')

const sentryErrorHandler = Sentry.Handlers.errorHandler()

module.exports = sentryErrorHandler
