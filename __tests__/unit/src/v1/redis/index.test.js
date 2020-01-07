const index = require('../../../../../src/v1/redis/index')

describe('v1', () => {

  describe('redis', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'keyEventExpired'
        ]
        expectedKeys.forEach(key => {
          expect(index).toHaveProperty(key)
          expect(typeof index[key]).toBe('function')
        })
      })

    })

  })

})
