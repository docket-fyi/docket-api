const BaseError = require('./base')

class PasswordResetMismatchError extends BaseError {

  constructor(message = 'Password reset password and password confirmation mismatch') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMismatchError
