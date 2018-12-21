const BaseError = require('./base')

class InvalidLoginError extends BaseError {

  constructor(message = 'Invalid login') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = InvalidLoginError
