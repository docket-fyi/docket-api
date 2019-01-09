const BaseError = require('./base')

class RegistrationConfirmationCodeMissingError extends BaseError {

  constructor(message = 'Registration confirmation code missing') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationCodeMissingError
