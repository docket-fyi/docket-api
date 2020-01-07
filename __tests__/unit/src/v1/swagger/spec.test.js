const spec = require('../../../../../src/v1/swagger/spec')

describe('v1', () => {

  describe('swagger', () => {

    describe('spec', () => {

      it('exports an object', () => {
        expect(typeof spec).toBe('object')
      })

    })

  })

})
