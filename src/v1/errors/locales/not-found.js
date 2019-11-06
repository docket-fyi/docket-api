const BaseError = require('../base')

class LocaleNotFoundError extends BaseError {

  constructor(message = 'Locale not found') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LocaleNotFoundError);
    }
    this.translationKey = 'localeNotFound'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = LocaleNotFoundError
