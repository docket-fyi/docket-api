const pino = require('pino')

const { NODE_ENV } = process.env

const options = {
  name: `docket-api-${NODE_ENV}`,
  level: 'info',
  prettyPrint: NODE_ENV === 'development'
}
const destination = pino.destination(1) // `/docket-api-${NODE_ENV}.log`
const logger = pino(options, destination)

module.exports = logger
