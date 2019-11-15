const Joi = require('@hapi/joi')

const validations = {
  '/users': {
    post: (req, res, next) => {
      const { body } = req
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          type: Joi.string(),
          attributes: Joi.object().keys({
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string()
          })
        })
      })
      const options = {
        // abortEarly: false
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      return next()
    }
  },
  '/users/confirm-registration': {
    post: (req, res, next) => {
      const { body, query } = req
      const querySchema = Joi.object().keys({
        code: Joi.string().required()
      })
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          type: Joi.string(),
          attributes: Joi.object().keys({
            password: Joi.string().required(),
            passwordConfirmation: Joi.string().required()
          })
        })
      })
      const options = {
        // abortEarly: false
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      let queryValidation = querySchema.validate(query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  },
  '/users/forgot-password': {
    post: (req, res, next) => {
      const { body } = req
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          type: Joi.string(),
          attributes: Joi.object().keys({
            email: Joi.string().email().required()
          })
        })
      })
      const options = {
        // abortEarly: false
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      return next()
    }
  },
  '/users/reset-password': {
    post: (req, res, next) => {
      const { body, query } = req
      const querySchema = Joi.object().keys({
        code: Joi.string().required()
      })
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          type: Joi.string(),
          attributes: Joi.object().keys({
            password: Joi.string().required(),
            passwordConfirmation: Joi.string().required()
          })
        })
      })
      const options = {
        // abortEarly: false
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      let queryValidation = querySchema.validate(query, options)
      if (queryValidation.error) {
        return next(queryValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
