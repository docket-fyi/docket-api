const BaseError = require('../base')

class MicrosoftOAuthMissingAuthorizationCodeError extends BaseError {

  constructor(message = 'Event not found') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MicrosoftOAuthMissingAuthorizationCodeError);
    }
    this.translationKey = 'microsoftOAuthMissingAuthorizationCodeError'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MicrosoftOAuthMissingAuthorizationCodeError
