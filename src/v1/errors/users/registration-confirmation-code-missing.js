const BaseError = require('../base')

class RegistrationConfirmationCodeMissingError extends BaseError {

  constructor(message = 'Registration confirmation code missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RegistrationConfirmationCodeMissingError);
    }
    this.translationKey = 'missingCode'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationCodeMissingError
