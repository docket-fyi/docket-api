const BaseError = require('./base')

class ForgotPasswordEmailMissingError extends BaseError {

  constructor(message = 'Forgot password email missing') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = ForgotPasswordEmailMissingError
