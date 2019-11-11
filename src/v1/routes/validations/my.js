const Joi = require('@hapi/joi')

const validations = {
  '/my/profile': {
    patch: (req, res, next) => { // eslint-disable-line arrow-body-style
      return next()
    }
  },
  '/my/events': {
    post: (req, res, next) => {
      const { body } = req
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          attributes: Joi.object().keys({
            name: Joi.string().min(1).required(),
            date: Joi.date().required()
          })
        })
      })
      // const options = {}
      let bodyValidation = bodySchema.validate(body)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      return next()
    }
  },
  '/my/events/import': {
    post: (req, res, next) => { // eslint-disable-line arrow-body-style
      return next()
    }
  },
  '/my/events/:eventId': {
    patch: (req, res, next) => {
      const { params, body } = req
      const paramsSchema = Joi.object().keys({
        eventId: Joi.number().integer().required()
      })
      const bodySchema = Joi.object().keys({
        data: Joi.object().keys({
          attributes: Joi.object().keys({
            name: Joi.string().min(1),
            date: Joi.date()
          })
        })
      })
      const options = {}
      let paramsValidation = paramsSchema.validate(params, options)
      if (paramsValidation.error) {
        return next(paramsValidation.error)
      }
      let bodyValidation = bodySchema.validate(body, options)
      if (bodyValidation.error) {
        return next(bodyValidation.error)
      }
      return next()
    }
  }
}

module.exports = validations
