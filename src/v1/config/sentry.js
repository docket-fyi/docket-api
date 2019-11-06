const Sentry = require('@sentry/node')

const environment = require('../environment')

Sentry.init({
  dsn: environment.sentry.dsn,
  environment: environment.api.name
})
