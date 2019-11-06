const BaseError = require('../base')

class UserAlreadyConfirmedError extends BaseError {

  constructor(message = 'User already confirmed') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserAlreadyConfirmedError);
    }
    this.translationKey = 'userAlreadyConfirmed'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = UserAlreadyConfirmedError
