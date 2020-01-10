const cacheKeys = require('../../../../../src/v1/config/cache-keys')

describe('v1', () => {

  describe('config', () => {

    describe('cache keys', () => {

      it('exports an object', () => {
        cacheKeys.locales.show('foo')
        expect(typeof cacheKeys).toBe('object')
      })

    })

  })

})
