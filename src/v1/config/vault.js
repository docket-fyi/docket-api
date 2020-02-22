const nodeVault = require('node-vault')

// const environment = require('../environment')
// const { apiVersion, protocol, host, port } = environment.vault
const apiVersion = process.env.VAULT_API_VERSION || 'v1'
const protocol = process.env.VAULT_PROTOCOL || 'http'
const host = process.env.VAULT_HOST
const port = process.env.VAULT_PORT || 8200

const endpoint = `${protocol}://${host}:${port}`
// @see https://github.com/kr1sp1n/node-vault/blob/master/src/index.js#L21
const options = {
  apiVersion,
  endpoint,
  token: process.env.VAULT_TOKEN,
  // debug: process.env.VAULT_DEBUG,
  // tv4: process.env.VAULT_TV4,
  // commands: process.env.VAULT_COMMANDS,
  // mustache: process.env.VAULT_MUSTACHE,
  // pathPrefix: process.env.VAULT_PATH_PREFIX,
  // noCustomHTTPVerbs: process.env.VAULT_NO_CUSTOM_HTTP_VERBS === 'true',
  // requestOptions: process.env.VAULT_REQUEST_OPTIONS
}
const vault = nodeVault(options)

module.exports = vault
