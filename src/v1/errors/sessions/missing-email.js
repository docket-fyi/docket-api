const BaseError = require('../base')

class MissingEmailError extends BaseError {

  constructor(message = 'Missing email') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingEmailError);
    }
    this.translationKey = 'missingEmail'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MissingEmailError
