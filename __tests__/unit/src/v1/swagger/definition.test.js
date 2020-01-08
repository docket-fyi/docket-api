const definition = require('../../../../../src/v1/swagger/definition')

describe('v1', () => {

  describe('swagger', () => {

    describe('definition', () => {

      it('exports an object', () => {
        expect(typeof definition).toBe('object')
        expect(definition).toHaveProperty('info')
        expect(definition).toHaveProperty('info.title', 'Docket API')
        expect(definition).toHaveProperty('info.version', '1.0.0')
        expect(definition).toHaveProperty('info.description', 'Docket API')
        expect(definition).toHaveProperty('info.termsOfService', 'https://docket.fyi/terms-of-service')
        expect(definition).toHaveProperty('info.contact')
        expect(definition).toHaveProperty('info.contact.name', 'Docket Development Team')
        expect(definition).toHaveProperty('info.contact.email', 'development@docket.fyi')
        expect(definition).toHaveProperty('info.license')
        expect(definition).toHaveProperty('info.license.name', 'MIT')
        expect(definition).toHaveProperty('servers')
        expect(definition).toHaveProperty('security')
      })

    })

  })

})
