const BaseError = require('../base')

class PasswordResetMismatchError extends BaseError {

  constructor(message = 'Password reset password and password confirmation mismatch') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetMismatchError);
    }
    this.translationKey = 'passwordMismatch'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMismatchError
