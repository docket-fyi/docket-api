const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('User', {
  attributes: [
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'confirmedAt',
    'updatedAt'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/my/profile'
  }
})
