const index = require('../../../../../src/v1/serializers/index')

describe('v1', () => {

  describe('serializers', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'healthCheck',
          'search',
          'sessions',
          'users',
          'my',
          'locales',
          'google',
          'microsoft'
        ]
        expectedKeys.forEach(key => {
          expect(index).toHaveProperty(key)
          expect(typeof index[key]).toBe('object')
        })
      })

    })

  })

})
