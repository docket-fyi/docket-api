const BaseError = require('./base')

class PasswordResetSamePasswordError extends BaseError {

  constructor(message = 'Password reset is the same as old password') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = PasswordResetSamePasswordError
