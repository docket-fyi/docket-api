const BaseError = require('./base')

class PasswordResetSamePasswordError extends BaseError {

  constructor(message = 'Password reset is the same as old password') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PasswordResetSamePasswordError);
    }
    this.translationKey = 'samePassword'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetSamePasswordError
