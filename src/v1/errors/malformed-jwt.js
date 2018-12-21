const BaseError = require('./base')

class MalformedJwtError extends BaseError {

  constructor(message = 'Malformed JWT') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = MalformedJwtError
