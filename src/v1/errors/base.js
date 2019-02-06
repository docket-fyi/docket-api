class BaseError extends Error {

  constructor(message = 'Error') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }
    this.translationKey = 'error'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = BaseError
