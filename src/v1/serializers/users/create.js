const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('User', {
  attributes: [
    'firstName',
    'lastName',
    'email'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  topLevelLinks: {
    self: '/v1/users'
  }
  // dataLinks: {
  //   self: data => `/v1/users/${data.id}`
  // }
})
