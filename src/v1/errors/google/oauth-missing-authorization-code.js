const BaseError = require('../base')

class GoogleOAuthMissingAuthorizationCodeError extends BaseError {

  constructor(message = 'Google OAuth missing authorization code') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GoogleOAuthMissingAuthorizationCodeError);
    }
    this.translationKey = 'googleOAuthMissingAuthorizationCode'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = GoogleOAuthMissingAuthorizationCodeError
