const BaseError = require('../base')

class MissingPasswordError extends BaseError {

  constructor(message = 'Missing password') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingPasswordError);
    }
    this.translationKey = 'missingPassword'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MissingPasswordError
