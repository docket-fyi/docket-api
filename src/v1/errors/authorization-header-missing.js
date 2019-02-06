const BaseError = require('./base')

class AuthorizationHeaderMissingError extends BaseError {

  constructor(message = 'Authorization header missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationHeaderMissingError);
    }
    this.translationKey = 'authorizationHeaderMissing'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = AuthorizationHeaderMissingError
