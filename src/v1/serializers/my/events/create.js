const JsonApiSerializer = require('jsonapi-serializer').Serializer

module.exports = new JsonApiSerializer('Event', {
  attributes: [
    'name',
    'slug',
    'date'
    // 'createdAt',
    // 'updatedAt'
  ],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
  // dataLinks: {
  //   self: event => `v1/events/${events.id}`
  // }
  topLevelLinks: {
    self: '/v1/my/events'
  }
})
