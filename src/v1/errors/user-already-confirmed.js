const BaseError = require('./base')

class UserAlreadyConfirmedError extends BaseError {

  constructor(message = 'User already confirmed') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = UserAlreadyConfirmedError
