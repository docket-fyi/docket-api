const index = require('../../../../../src/v1/routes/index')

describe('v1', () => {

  describe('routes', () => {

    describe('index', () => {

      it('exports an array', () => {
        expect(Array.isArray(index)).toBe(true)
      })

    })

  })

})
