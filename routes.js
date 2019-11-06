require('dotenv').config()
const listEndpoints = require('express-list-endpoints')

const API_VERSION = process.env.API_VERSION || 'v1'
const EXPRESS_APP_PATH = process.env.EXPRESS_APP_PATH || `./src/${API_VERSION}/config/express.js`
const app = require(EXPRESS_APP_PATH)

console.log(listEndpoints(app)) // eslint-disable-line no-console
process.exit(0)
