const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('Translation', {
  attributes: [
    'key',
    'localeId',
    'text',
    'createdAt',
    'updatedAt'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/locales/:localeId/translations'
  }
})
