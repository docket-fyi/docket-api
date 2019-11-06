const BaseError = require('../base')

class UserNotConfirmedError extends BaseError {

  constructor(message = 'User not confirmed') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotConfirmedError);
    }
    this.translationKey = 'userNotConfirmed'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = UserNotConfirmedError
