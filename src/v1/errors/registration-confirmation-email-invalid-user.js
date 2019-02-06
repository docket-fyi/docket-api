const BaseError = require('./base')

class RegistrationConfirmationEmailInvalidUserError extends BaseError {

  constructor(message = 'Registration confirmation email invalid user') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegistrationConfirmationEmailInvalidUserError);
    }
    this.translationKey = 'invalidUser'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationEmailInvalidUserError
