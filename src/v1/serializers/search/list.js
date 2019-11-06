const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('Search', {
  attributes: [
    '_index',
    '_type',
    '_id',
    '_score',
    '_source'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/search'
  }
})
