module.exports = {
  openapi: '3.0.2',
  info: {
    title: 'Docket API',
    description: 'Docket API',
    termsOfService: 'https://docket.fyi/terms-of-service',
    version: '1.0.0',
    contact: {
      name: 'Docket Development Team',
      email: 'development@docket.fyi'
      // url: '...'
    },
    license: {
      name: 'MIT'
      // url: '...'
    }
  },
  // host: 'localhost:3001',
  // consumes: [
  //   'application/vnd.api+json'
  // ],
  // produces: [
  //   'application/vnd.api+json'
  // ],
  // schemes: [
  //   'http',
  //   'https'
  // ],
  // basePath: '/v1',
  servers: [
    {
      url: 'http://{host}:{port}/{version}',
      // description: '...',
      variables: {
        host: {
          default: 'localhost',
          description: 'The API host to use',
          enum: [
            'localhost',
            'api.staging.docket.fyi',
            'api.docket.fyi'
          ]
        },
        version: {
          default: 'v1',
          description: 'The API version to use'
        },
        port: {
          default: '3001',
          description: 'The port that the API runs on'
        }
      }
    }
  ],
  // externalDocs: {
  //   description: '',
  //   url: ''
  // },
  security: [
    {
      bearerAuth: []
    }
  ]
}
