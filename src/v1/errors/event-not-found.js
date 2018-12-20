const BaseError = require('./base')

class EventNotFoundError extends BaseError {

  constructor(message = 'Event not found') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = EventNotFoundError
