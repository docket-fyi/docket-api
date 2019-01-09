const BaseError = require('./base')

class RegistrationConfirmationEmailMissingUserError extends BaseError {

  constructor(message = 'Registration confirmation email missing user') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = RegistrationConfirmationEmailMissingUserError
