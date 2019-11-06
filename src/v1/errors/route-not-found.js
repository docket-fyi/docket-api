const BaseError = require('./base')

class RouteNotFoundError extends BaseError {

  constructor(message = 'Route not found') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteNotFoundError)
    }
    this.translationKey = 'routeNotFound'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = RouteNotFoundError
