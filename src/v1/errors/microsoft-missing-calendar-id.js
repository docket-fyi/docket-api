const BaseError = require('./base')

class MicrosoftMissingCalendarIdError extends BaseError {

  constructor(message = 'Microsoft missing calendar ID') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MicrosoftMissingCalendarIdError);
    }
    this.translationKey = 'microsotMissingCalendarId'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MicrosoftMissingCalendarIdError
