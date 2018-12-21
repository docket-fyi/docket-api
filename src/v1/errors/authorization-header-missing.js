const BaseError = require('./base')

class AuthorizationHeaderMissingError extends BaseError {

  constructor(message = 'Authorization header missing') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = AuthorizationHeaderMissingError
