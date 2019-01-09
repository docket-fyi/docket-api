const BaseError = require('./base')

class UserNotConfirmedError extends BaseError {

  constructor(message = 'User not confirmed') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = UserNotConfirmedError
