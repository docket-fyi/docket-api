const BaseError = require('../base')

class VaultMissingTokenError extends BaseError {

  constructor(message = 'Vault token missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VaultMissingTokenError);
    }
    this.translationKey = 'vaultMissingToken'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = VaultMissingTokenError
