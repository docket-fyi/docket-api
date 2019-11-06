const BaseError = require('../base')

class EventNotFoundError extends BaseError {

  constructor(message = 'Event not found') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EventNotFoundError);
    }
    this.translationKey = 'eventNotFound'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = EventNotFoundError
