const debug = require('debug')('app:api')
const httpStatus = require('http-status')

function error(err, req, res, next) { // eslint-disable-line no-unused-vars
  const json = {
    errors: [
      {
        name: err.name,
        message: err.message,
      }
    ]
  }
  debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.INTERNAL_SERVER_ERROR} ${httpStatus[500]})`)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(json)
}

module.exports = error
