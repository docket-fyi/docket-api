const BaseError = require('./base')

class PasswordResetMissingCodeError extends BaseError {

  constructor(message = 'Password reset missing code') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetMissingCodeError
