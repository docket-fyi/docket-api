/* eslint-disable no-console */

const repl = require('repl')

console.log(`Loading ${process.env.NODE_ENV || 'development'} environment (Node ${process.version})`)
const replServer = repl.start()
replServer.context.db = require('./src/v1/config/db')
// replServer.context.app = require('./src/v1/config/express')
replServer.context.models = require('./src/models')
replServer.context.environment = require('./src/v1/environment')
console.log(`The following objects are available: ${Object.keys(replServer.context).join(', ')}\n`)
replServer.on('reset', () => console.log('Context reset.'))
replServer.on('exit', () => {
  console.log('Goodbye.')
  process.exit(0)
})
