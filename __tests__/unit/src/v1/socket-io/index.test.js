const index = require('../../../../../src/v1/socket-io/index')

describe('v1', () => {

  describe('socket IO', () => {

    describe('index', () => {

      it('exports a map', () => {
        expect(typeof index).toBe('object')
        expect(index).toBeInstanceOf(Map)
      })

    })

  })

})
