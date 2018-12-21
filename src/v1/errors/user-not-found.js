const BaseError = require('./base')

class UserNotFoundError extends BaseError {

  constructor(message = 'User not found') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = UserNotFoundError
