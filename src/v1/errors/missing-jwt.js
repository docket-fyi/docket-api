const BaseError = require('./base')

class MissingJwtError extends BaseError {

  constructor(message = 'JWT missing') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = MissingJwtError
