const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('Event', {
  attributes: [
    'id',
    'name',
    'slug',
    'date',
    'createdAt',
    'updatedAt'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/my/events'
  }
})
