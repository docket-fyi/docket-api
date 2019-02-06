module.exports = {
  name: process.NODE_ENV || 'development',
  api: {
    port: process.env.PORT || '3000'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION
  },
  passwordReset: {
    secret: process.env.PASSWORD_RESET_SECRET,
    expiration: process.env.PASSWORD_RESET_EXPIRATION || '1d',
    from: process.env.PASSWORD_RESET_FROM || 'no-reply@docket.fyi',
  },
  db: { // @todo Rename this to 'mongo'
    protocol: process.env.DB_PROTOCOL || 'mongodb://',
    host: process.env.DB_HOST || 'docket-mongo',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'docket_development',
    useSSL: process.env.DB_USE_SSL || 'false',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  redis: {
    protocol: process.env.REDIS_PROTOCOL || 'redis://',
    host: process.env.REDIS_HOST || 'docket-redis',
    port: process.env.REDIS_PORT || '6379',
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  registrationConfirmation: {
    secret: process.env.REGISTRATION_CONFIRMATION_SECRET,
    expiration: process.env.REGISTRATION_CONFIRMATION_EXPIRATION || '1d',
    from: process.env.REGISTRATION_CONFIRMATION_FROM || 'no-reply@docket.fyi'
  },
  google: {
    clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_CALENDAR_REDIRECT_URL,
    apiKey: process.env.GOOGLE_CALENDAR_API_KEY,
    scopes: () => process.env.GOOGLE_CALENDAR_SCOPES.split(',').map(scope => scope.trim()),
    rawScopes: process.env.GOOGLE_CALENDAR_SCOPES
  }
}
