// @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html

const { Client } = require('@elastic/elasticsearch')

const Secret = require('../config/secret')

let client = null

async function getClient() {
  const elasticsearchSecrets = await Secret.get('elasticsearch')
  if (!client) {
    client = new Client({
      node: `${elasticsearchSecrets.ELASTICSEARCH_PROTOCOL}://${elasticsearchSecrets.ELASTICSEARCH_HOST}:${elasticsearchSecrets.ELASTICSEARCH_PORT}`
    })
  }
  return client
}

// const indicies = ['docket']

module.exports = {
  getClient
}
