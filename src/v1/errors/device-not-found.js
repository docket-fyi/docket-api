const BaseError = require('./base')

class DeviceNotFoundError extends BaseError {

  constructor(message = 'Device not found') {
    super(message)
    this.name = this.constructor.name
  }

}

module.exports = DeviceNotFoundError
