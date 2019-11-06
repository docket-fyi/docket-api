const express = require('express')
const status = require('http-status')

const { locales } = require('../controllers')
// const { verifyJwt } = require('../middleware')
const errors = require('../errors')
const { Locale } = require('../models')

const router = express.Router()

/*
GET /i18n         --> {'en-US': {hello: {id: 1, text: 'Hello'}}, 'es-ES': {hello: {id: 1, text: 'Hola'}}}
                        -OR-
                      [{id: 1, code: "en-US"}, {id: 2, code: "es-ES"}]
GET /i18n/en-US   --> {hello: {id: 1, text: 'Hello'}, ...} - OR - {hello: 'Hello', ...}
GET /i18n/en-US/1 --> {id: 1, key: 'hello', text: 'Hello'}
GET /i18n/1       --> {id: 1, key: 'hello', 'en-US': 'Hello', 'es-ES': 'Hola'}
GET /i18n/1/en-US --> {id: 1, key: 'hello', text: 'Hello'}

POST request body
{
  key: 'goodbye',
  'en-US': 'Goodbye',
  'es-ES': 'Adios'
}

GET response body
{
  'en-US': {
    hello: 'Hello',
    goodbye: 'Goodbye'
  },
  'es-ES': {
    hello: 'Hola',
    goodbye: 'Adios'
  }
}
*/

async function setLocale(req, res, next) {
  try {
    const { params } = req
    const locale = await Locale.findOne({
      where: {
        code: params.localeCode
      }
    })
    if (!locale) {
      res.status(status.NOT_FOUND)
      throw new errors.locales.NotFoundError()
    }
    req.locale = locale
    return next()
  } catch (err) {
    return next(err)
  }
}

router.get('/locales', locales.list)
// router.get('/locales/:localeCode', locales.show)
// router.post('/locales', verifyJwt, verifyJwt, isAdmin, locales.create)
// router.put('/locales/:localeCode', verifyJwt, isAdmin, locales.update)
// router.delete('/locales/:localeCode', verifyJwt, isAdmin, locales.destroy)

router.get('/locales/:localeCode/translations', setLocale, locales.listTranslations)
// router.post('/locales/:localeCode/translations', verifyJwt, isAdmin, locales.createTranslation)
// router.put('/locales/:localeCode/translations/:translationId', verifyJwt, isAdmin, locales.updateTranslation)
// router.delete('/locales/:localeCode/translations/:translationId', verifyJwt, isAdmin, locales.destroyTranslation)

module.exports = router
