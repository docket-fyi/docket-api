const BaseError = require('./base')

class MissingJwtError extends BaseError {

  constructor(message = 'JWT missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingJwtError);
    }
    this.translationKey = 'missingJwt'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MissingJwtError
