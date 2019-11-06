/* eslint-disable no-console */

require('dotenv').config()
const repl = require('repl')

const apiVersion = process.env.API_VERSION || 'v1'

console.log(`Loading ${process.env.NODE_ENV || 'development'} environment (Node ${process.version})`)
const replServer = repl.start()
replServer.context.db = require(`./src/${apiVersion}/config/sequelize`)
// replServer.context.app = require(`./src/${apiVersion}/config/express`)
replServer.context.models = require(`./src/${apiVersion}/models`)
replServer.context.environment = require(`./src/${apiVersion}/environment`)
console.log(`The following objects are available: ${Object.keys(replServer.context).join(', ')}\n`)
replServer.on('reset', () => console.log('Context reset.'))
replServer.on('exit', () => {
  console.log('Goodbye.')
  process.exit(0)
})
