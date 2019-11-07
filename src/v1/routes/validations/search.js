const Joi = require('@hapi/joi')

const validations = {
  '/search': {
    get: (req, res, next) => {
      const { query } = req
      const schema = {
        query: Joi.object().keys({
          query: Joi.string().required()
        })
      }
      const options = {}
      let queryValidation = Joi.validate(query, schema.query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
