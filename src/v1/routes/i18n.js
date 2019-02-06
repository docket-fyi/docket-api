const express = require('express')
const status = require('http-status')

const { i18n } = require('../controllers')
// const { verifyJwt } = require('../middleware')
const { LocaleNotFoundError } = require('../errors')
const { Locale } = require('../../models')

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

// router.get('/i18n', i18n.index)
router.get('/i18n/:localeCode', i18n.getLocale)
// router.get('/i18n/:localeCode/:id', i18n.getTranslation)
// router.post('/i18n', verifyJwt, verifyJwt, isAdmin, i18n.createLocale)
// router.post('/i18n/:localeCode', verifyJwt, isAdmin, i18n.createTranslation)
// router.put('/i18n/:localeCode', verifyJwt, isAdmin, i18n.updateLocale)
// router.put('/i18n/:localeCode/:id', verifyJwt, isAdmin, i18n.updateTranslation)
// router.delete('/i18n/:localeCode', verifyJwt, isAdmin, i18n.destroyLocale)
// router.delete('/i18n/:localeCode/:id', verifyJwt, isAdmin, i18n.destroyTranslation)

router.param('localeCode', async (req, res, next, code) => {
  try {
    const locale = await Locale.findOne({ code }).exec()
    if (!locale) {
      res.status(status.NOT_FOUND)
      throw new LocaleNotFoundError()
    }
    req.locale = locale
    return next()
  } catch (err) {
    return next(err)
  }
})

// router.param('id', async (req, res, next, id) => {
//   try {
//     const translation = await Translation.findOne({ _id: id }).exec() // @todo {userId: currentUser.id}
//     if (!translation) {
//       res.status(status.NOT_FOUND)
//       throw new TranslationNotFoundError()
//     }
//     req.translation = translation
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// })

module.exports = router
