const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('Locale', {
  attributes: [
    'code',
    'name',
    'createdAt',
    'updatedAt'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/locales'
  }
})
