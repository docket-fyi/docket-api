module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION
  },
  db: {
    protocol: process.env.DB_PROTOCOL || 'mongodb://',
    host: process.env.DB_HOST || 'docket-db',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'docket_development',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}
