module.exports = {
  api: {
    port: process.env.PORT || 3000
  },
  db: {
    protocol: process.env.DB_PROTOCOL || 'mongodb://',
    url: process.env.DB_SERVERS || '127.0.0.1',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'docket_development',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}
