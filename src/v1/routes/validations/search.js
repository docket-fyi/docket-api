const Joi = require('@hapi/joi')

const validations = {
  '/search': {
    get: (req, res, next) => {
      const { query } = req
      const querySchema = Joi.object().keys({
        query: Joi.string().required()
      })
      const options = {}
      let queryValidation = querySchema.validate(query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
