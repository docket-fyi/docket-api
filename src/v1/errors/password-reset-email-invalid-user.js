const BaseError = require('./base')

class PasswordResetEmailInvalidUserError extends BaseError {

  constructor(message = 'Password reset email invalid user') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetEmailInvalidUserError);
    }
    this.translationKey = 'invalidUser'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetEmailInvalidUserError
