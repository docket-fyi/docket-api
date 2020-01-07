const jsonApi = require('../../../../../src/v1/config/json-api')

describe('v1', () => {

  describe('config', () => {

    describe('JSON:API', () => {

      it('exports an object', () => {
        expect(typeof jsonApi).toBe('object')
      })

      it('exports the JSON:API content type', () => {
        expect(jsonApi).toHaveProperty('contentType', 'application/vnd.api+json')
      })

    })

  })

})
