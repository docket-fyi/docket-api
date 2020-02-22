const BaseError = require('../base')

class NotAcceptableError extends BaseError {

  constructor(message = 'Not acceptable') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotAcceptableError);
    }
    this.translationKey = 'unsupportedMediaType'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = NotAcceptableError
