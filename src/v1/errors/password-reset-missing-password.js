const BaseError = require('./base')

class PasswordResetMissingPasswordError extends BaseError {

  constructor(message = 'Password reset missing password and/or password confirmation') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMissingPasswordError
