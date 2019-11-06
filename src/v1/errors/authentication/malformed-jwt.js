const BaseError = require('../base')

class MalformedJwtError extends BaseError {

  constructor(message = 'Malformed JWT') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MalformedJwtError);
    }
    this.translationKey = 'malformedJwt'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MalformedJwtError
