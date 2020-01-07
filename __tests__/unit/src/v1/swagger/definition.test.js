const definition = require('../../../../../src/v1/swagger/definition')

describe('v1', () => {

  describe('swagger', () => {

    describe('definition', () => {

      it('exports an object', () => {
        expect(typeof definition).toBe('object')
        expect(definition).toHaveProperty('info')
        expect(definition).toHaveProperty('info.title', 'Docket API')
        expect(definition).toHaveProperty('info.version', '0.1.0')
        expect(definition).toHaveProperty('info.description', 'Docket API')
        expect(definition).toHaveProperty('info.termsOfService', 'https://docket.fyi/terms-of-service')
        expect(definition).toHaveProperty('info.contact')
        expect(definition).toHaveProperty('info.contact.name', 'Docket Development Team <development@docket.fyi>')
        expect(definition).toHaveProperty('info.license')
        expect(definition).toHaveProperty('info.license.name', 'MIT')
        expect(definition).toHaveProperty('host', 'localhost:3001')
        expect(definition).toHaveProperty('consumes', ['application/vnd.api+json'])
        expect(definition).toHaveProperty('produces', ['application/vnd.api+json'])
        expect(definition).toHaveProperty('schemes', ['http', 'https'])
        expect(definition).toHaveProperty('basePath', '/v1')
      })

    })

  })

})
