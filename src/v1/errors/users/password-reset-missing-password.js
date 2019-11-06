const BaseError = require('../base')

class PasswordResetMissingPasswordError extends BaseError {

  constructor(message = 'Password reset missing password and/or password confirmation') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetMissingPasswordError);
    }
    this.translationKey = 'missingPassword'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMissingPasswordError
