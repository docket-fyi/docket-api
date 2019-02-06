const BaseError = require('./base')

class RegistrationConfirmationEmailMissingUserError extends BaseError {

  constructor(message = 'Registration confirmation email missing user') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegistrationConfirmationEmailMissingUserError);
    }
    this.translationKey = 'missingUser'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationEmailMissingUserError
