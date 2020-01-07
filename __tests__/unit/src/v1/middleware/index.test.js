const index = require('../../../../../src/v1/middleware/index')

describe('v1', () => {

  describe('middleware', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'arena',
          'jsonBodyParser',
          'cors',
          'currentLocale',
          'setGoogleOAuthCredentials',
          'clearGoogleOAuthCredentials',
          'logRequest',
          'logResponse',
          'routeNotFound',
          'error',
          'verifyJwt',
          'currentUser',
          'socketIO',
          'pino',
          'sentryRequestHandler',
          'sentryErrorHandler',
          'jsonApiDeserializer',
          'jsonApiUnsupportedMediaType',
          'jsonApiNotAcceptable',
          'sendJsonResponse',
          'setJsonApiContentType',
          'setSentryContext'
        ]
        expectedKeys.forEach(key => expect(index).toHaveProperty(key))
      })

    })

  })

})
