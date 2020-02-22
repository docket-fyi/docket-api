const BaseError = require('../base')

class VaultNotInitializedError extends BaseError {

  constructor(message = 'Vault not initialized') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VaultNotInitializedError);
    }
    this.translationKey = 'vaultNotInitialized'
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = VaultNotInitializedError
