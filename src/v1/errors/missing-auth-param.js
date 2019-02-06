const BaseError = require('./base')

class MissingAuthParamError extends BaseError {

  constructor(message = 'Missing auth param') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingAuthParamError);
    }
    this.translationKey = 'missingAuthParam'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = MissingAuthParamError
