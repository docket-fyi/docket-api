const Sentry = require('@sentry/node')

const sentryRequestHandler = Sentry.Handlers.requestHandler()

module.exports = sentryRequestHandler
