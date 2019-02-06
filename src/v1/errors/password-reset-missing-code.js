const BaseError = require('./base')

class PasswordResetMissingCodeError extends BaseError {

  constructor(message = 'Password reset missing code') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetMissingCodeError);
    }
    this.translationKey = 'missingCode'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMissingCodeError
