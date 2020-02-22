const logger = require('./logger')
const vault = require('./vault')

class Secret {

  static async get(pathSuffix, key = null, options = {}) {
    try {
      const defaultOptions = {
        // pathAsArray: false,
        pathSeparator: '/',
        includeEnvironmentInPath: true,
        environment: process.env.NODE_ENV || 'development',
        includeSecretsEngineInPath: true,
        secretsEnginePath: process.env.VAULT_SECRETS_ENGINE_PATH || 'kv',
        loggingEnabled: false
      }
      const mergedOptions = Object.assign({}, defaultOptions, options) // eslint-disable-line prefer-object-spread
      const pathPieces = []
      if (mergedOptions.includeSecretsEngineInPath) pathPieces.push(mergedOptions.secretsEnginePath)
      if (mergedOptions.includeEnvironmentInPath) pathPieces.push(mergedOptions.environment)
      pathPieces.push(pathSuffix)
      const fullPath = pathPieces.join(mergedOptions.pathSeparator)
      if (mergedOptions.loggingEnabled) logger.info(`Reading from Vault at path ${fullPath}`)
      const response = await vault.read(fullPath)
      return key
        ? response.data[key]
        : response.data
    } catch (err) {
      /* if (mergedOptions.loggingEnabled) */ logger.error(err)
    }
  }

}

module.exports = Secret
