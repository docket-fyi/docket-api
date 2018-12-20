const environment = require('./src/v1/environment')
const debug = require('./src/v1/config/debug').api

const server = require('./src/v1/config/server')

server.listen(environment.api.port, () => debug(`server listening on port ${environment.api.port}`))
