class BaseError extends Error {

  constructor(message = 'Error') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = BaseError
