const BaseError = require('./base')

class PasswordResetEmailMissingUserError extends BaseError {

  constructor(message = 'Password reset email missing user') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetEmailMissingUserError
