const httpStatus = require('http-status')
const debug = require('debug')('app:api')

function routeNotFound(req, res) {
  debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.NOT_FOUND} ${httpStatus[404]})`)
  const json = {
    errors: [
      {
        name: 'Not Found',
        message: `The route ${req.method} ${req.originalUrl} does not exist`
      }
    ]
  }
  res.status(httpStatus.NOT_FOUND).json(json)
}

module.exports = routeNotFound
