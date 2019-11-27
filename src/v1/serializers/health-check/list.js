const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('HealthCheck', {
  attributes: [
    'api',
    'vault',
    'elasticsearch',
    'redis',
    'postgres',
    'stripe',
    'errors'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/health-check'
  }
})
