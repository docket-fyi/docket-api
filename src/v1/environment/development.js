module.exports = {
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
  db: {
    protocol: process.env.DB_PROTOCOL || 'mongodb://',
    host: process.env.DB_HOST || 'docket-db', // 'docket-db',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'docket_development',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
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
}
