const cors = require('cors')

const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  exposedHeaders: 'Content-Location,Content-Length,Content-Range,Location,Link,WWW-Authenticate,Allow',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

module.exports = cors(options)
