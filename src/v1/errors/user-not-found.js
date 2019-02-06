const BaseError = require('./base')

class UserNotFoundError extends BaseError {

  constructor(message = 'User not found') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
    this.translationKey = 'userNotFound'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = UserNotFoundError
