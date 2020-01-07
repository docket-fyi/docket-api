const index = require('../../../../../src/v1/controllers/index')

describe('v1', () => {

  describe('controllers', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
      })

      it('namespaces controller methods', () => {
        const givenKeys = Object.keys(index)
        const expectedControllers = [
          'sessions',
          'docs',
          'google',
          'healthCheck',
          'locales',
          'my',
          'microsoft',
          'users',
          'search'
        ]
        expect(givenKeys).toEqual(expectedControllers)
        expectedControllers.forEach(controller => expect(typeof index[controller]).toEqual('object'))
      })

    })

  })

})
