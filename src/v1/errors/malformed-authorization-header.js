const BaseError = require('./base')

class MalformedAuthorizationHeaderError extends BaseError {

  constructor(message = 'Malformed authorization header') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = MalformedAuthorizationHeaderError
