// const logger = require('./logger')
// const Secret = require('./secret')
// const environment = require('../environment')
// const debug = require('../config/debug').postgres

async function sequelizeCliInit() {
  // const database = await Secret.get('postgres', 'DB_NAME')
  // const username = await Secret.get('postgres', 'DB_USERNAME')
  // const password = await Secret.get('postgres', 'DB_PASSWORD')
  // const host = await Secret.get('postgres', 'DB_HOST')
  // const dialect = await Secret.get('postgres', 'DB_DIALECT')
  // const {
  //   database,
  //   username,
  //   password,
  //   host,
  //   // port,
  //   dialect
  // } = environment.postgres
}

sequelizeCliInit()

// module.exports = {
//   [process.env.NODE_ENV]: {
//     database,
//     username,
//     password,
//     // host: `${host}:${port}`,
//     host,
//     dialect,
//     // logging: query => debug(query)
//     logging: query => logger.info(query)
//   }
// }
