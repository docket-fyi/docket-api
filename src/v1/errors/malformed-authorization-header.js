const BaseError = require('./base')

class MalformedAuthorizationHeaderError extends BaseError {

  constructor(message = 'Malformed authorization header') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MalformedAuthorizationHeaderError);
    }
    this.translationKey = 'malformedAuthorizationHeader'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MalformedAuthorizationHeaderError
