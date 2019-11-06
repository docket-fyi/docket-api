const BaseError = require('../base')

class ForgotPasswordEmailMissingError extends BaseError {

  constructor(message = 'Forgot password email missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForgotPasswordEmailMissingError);
    }
    this.translationKey = 'emailMissing'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = ForgotPasswordEmailMissingError
