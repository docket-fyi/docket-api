const bodyParser = require('body-parser')

const jsonApi = require('../config/json-api')

const options = {
  type: jsonApi.contentType
}

module.exports = bodyParser.json(options)
