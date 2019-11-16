// @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html

const { Client } = require('@elastic/elasticsearch')

const environment = require('../environment')

const { protocol, host, port } = environment.elasticsearch
const client = new Client({
  node: `${protocol}${host}:${port}`
})

// const indicies = ['docket']

module.exports = client
