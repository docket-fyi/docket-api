const environment = require('./src/v1/environment')
const debug = require('debug')('app:api')

const server = require('./src/v1/config/server')

server.listen(environment.api.port, () => debug(`server listening on port ${environment.api.port}`))
