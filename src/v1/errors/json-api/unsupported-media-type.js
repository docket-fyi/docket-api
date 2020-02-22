const BaseError = require('../base')

class UnsupportedMediaTypeError extends BaseError {

  constructor(message = 'Unsupported media type') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnsupportedMediaTypeError);
    }
    this.translationKey = 'unsupportedMediaType'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = UnsupportedMediaTypeError
