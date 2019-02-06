const BaseError = require('./base')

class PasswordResetEmailMissingUserError extends BaseError {

  constructor(message = 'Password reset email missing user') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetEmailMissingUserError);
    }
    this.translationKey = 'missingUser'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetEmailMissingUserError
