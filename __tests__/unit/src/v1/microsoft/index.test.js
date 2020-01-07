const index = require('../../../../../src/v1/microsoft/index')

describe('v1', () => {

  describe('microsoft', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'users'
        ]
        expectedKeys.forEach(key => {
          expect(index).toHaveProperty(key)
          expect(typeof index[key]).toBe('object')
        })
      })

    })

  })

})
