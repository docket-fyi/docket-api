const index = require('../../../../../src/v1/models/index')

describe('v1', () => {

  describe('models', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'init',
          'getUserModel',
          'getEventModel',
          'getLocaleModel',
          'getTranslationModel',
          'getGoogleCredentialModel',
          'getMicrosoftCredentialModel'
        ]
        expectedKeys.forEach(key => {
          expect(index).toHaveProperty(key)
          expect(typeof index[key]).toBe('function')
        })
      })

    })

  })

})
