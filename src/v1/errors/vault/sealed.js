const BaseError = require('../base')

class VaultSealedError extends BaseError {

  constructor(message = 'Vault is sealed') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VaultSealedError);
    }
    this.translationKey = 'vaultIsSealed'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = VaultSealedError
