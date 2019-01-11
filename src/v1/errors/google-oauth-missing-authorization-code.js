const BaseError = require('./base')

class GoogleOAuthMissingAuthorizationCodeError extends BaseError {

  constructor(message = 'Google OAuth missing authorization code') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = GoogleOAuthMissingAuthorizationCodeError
