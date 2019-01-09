const BaseError = require('./base')

class RegistrationConfirmationEmailInvalidUserError extends BaseError {

  constructor(message = 'Registration confirmation email invalid user') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationEmailInvalidUserError
