const BaseError = require('./base')

class MissingAuthParamError extends BaseError {

  constructor(message = 'Missing auth param') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = MissingAuthParamError
