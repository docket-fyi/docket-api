module.exports = {
  info: {
    title: 'Docket API',
    version: '0.1.0',
    description: 'Docket API',
    termsOfService: 'https://docket.fyi/terms-of-service',
    contact: {
      name: 'Docket Development Team <development@docket.fyi>'
    },
    license: {
      name: 'MIT'
    }
  },
  host: 'localhost:3001',
  consumes: [
    // 'application/json',
    'application/vnd.api+json'
  ],
  produces: [
    // 'application/json',
    'application/vnd.api+json'
  ],
  schemes: [
    'http',
    'https'
  ],
  basePath: '/v1'
}
