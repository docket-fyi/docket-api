const BaseError = require('./base')

class PasswordResetEmailInvalidUserError extends BaseError {

  constructor(message = 'Password reset email invalid user') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetEmailInvalidUserError
