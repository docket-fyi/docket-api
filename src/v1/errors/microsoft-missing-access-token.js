const BaseError = require('./base')

class MicrosoftMissingAccessTokenError extends BaseError {

  constructor(message = 'Microsoft missing calendar ID') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MicrosoftMissingAccessTokenError);
    }
    this.translationKey = 'microsotMissingAccessTokenId'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MicrosoftMissingAccessTokenError
