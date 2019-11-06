const environment = require('../environment')
const debug = require('../config/debug').postgres

const {
  database,
  username,
  password,
  host,
  // port,
  dialect
} = environment.postgres

module.exports = {
  [environment.api.name]: {
    database,
    username,
    password,
    // host: `${host}:${port}`,
    host,
    dialect,
    logging: query => debug(query)
  }
}
