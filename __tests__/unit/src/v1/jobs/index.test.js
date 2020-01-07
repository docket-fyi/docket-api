const index = require('../../../../../src/v1/jobs/index')

describe('v1', () => {

  describe('jobs', () => {

    describe('index', () => {

      it('exports an object', () => {
        expect(typeof index).toBe('object')
        const expectedKeys = [
          'sendRegistrationConfirmationEmail',
          'sendPasswordResetEmail'
        ]
        expectedKeys.forEach(key => {
          expect(index).toHaveProperty(key)
          expect(typeof index[key]).toBe('function')
        })
      })

    })

  })

})
