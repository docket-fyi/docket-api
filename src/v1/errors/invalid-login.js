const BaseError = require('./base')

class InvalidLoginError extends BaseError {

  constructor(message = 'Invalid login') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidLoginError);
    }
    this.translationKey = 'invalidLogin'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = InvalidLoginError
