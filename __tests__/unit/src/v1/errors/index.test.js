const index = require('../../../../../src/v1/errors/index')

describe('v1', () => {

  describe('errors', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'BaseError',
          'RouteNotFoundError',
          'authentication',
          'events',
          'google',
          'locales',
          'microsoft',
          'search',
          'sessions',
          'users'
        ]
        expectedKeys.forEach(key => expect(index).toHaveProperty(key))
      })

      it('namespaces errors', () => {
        const keys = [
          'authentication',
          'events',
          'google',
          'locales',
          'microsoft',
          'search',
          'sessions',
          'users'
        ]
        keys.forEach(key => expect(typeof index[key]).toBe('object'))
      })

      it('exports a BaseError class', () => {
        expect(typeof index.BaseError).toEqual('function')
        const instance = new index.BaseError()
        expect(instance).toBeInstanceOf(index.BaseError)
        expect(instance.message).toBe('Error')
        expect(instance.translationKey).toBe('error')
        expect(instance.name).toBe('BaseError')
      })

      it('exports a RouteNotFoundError class', () => {
        expect(typeof index.RouteNotFoundError).toEqual('function')
        const instance = new index.RouteNotFoundError()
        expect(instance).toBeInstanceOf(index.RouteNotFoundError)
        expect(instance.message).toBe('Route not found')
        expect(instance.translationKey).toBe('routeNotFound')
        expect(instance.name).toBe('RouteNotFoundError')
      })

    })

  })

})
