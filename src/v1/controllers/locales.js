const Sentry = require('@sentry/node')
const status = require('http-status')

const { Locale, Translation } = require('../models')
const serializers = require('../serializers')
const redis = require('../config/redis').primary
const cacheKeys = require('../config/cache-keys')
const environment = require('../environment')

/**
 * Fetches all locales and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /locales:
 *   get:
 *     summary: List locales
 *     description: List locales
 *     operationId: listLocales
 *     security: []
 *     tags:
 *       - Locales
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListLocalesOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function list(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'locales')
    scope.setTag('action', 'list')
  })
  try {
    let locales = null
    const cache = await redis.get(cacheKeys.locales.list)
    if (!cache) {
      locales = await Locale.findAll()
      const localesAsJson = locales.map(locale => locale.toJSON())
      const localesAsString = JSON.stringify(localesAsJson)
      await redis.setex(cacheKeys.locales.list, environment.redis.defaultTtl, localesAsString)
    } else {
      locales = Locale.build(JSON.parse(cache), {isNewRecord: false})
    }
    res.status(status.OK)
    res.body = serializers.locales.list.serialize(locales)
    // res.body.meta = res.body.meta || {}
    // res.body.meta.fromCache = Boolean(cache)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Fetches all translations for a locale and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /locales/{localeCode}/translations:
 *   get:
 *     summary: List translations by locale code
 *     description: List translations by locale code
 *     operationId: listTranslationsByLocale
 *     security: []
 *     tags:
 *       - Translations
 *     parameters:
 *       - $ref: '#/components/parameters/ListTranslationsByLocaleCodePathParameter'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListTranslationsByLocaleOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function listTranslations(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'locales')
    scope.setTag('action', 'listTranslations')
  })
  try {
    const { locale } = req
    let translations = null
    const cache = await redis.get(cacheKeys.locales.listTranslations(locale.code))
    if (!cache) {
      translations = await Translation.findAll({
        where: {
          localeId: locale.id
        }
      })
      const translationsAsJson = translations.map(translation => translation.toJSON())
      const translationsAsString = JSON.stringify(translationsAsJson)
      await redis.setex(cacheKeys.locales.listTranslations(locale.code), environment.redis.defaultTtl, translationsAsString)
    } else {
      translations = Translation.build(JSON.parse(cache), {isNewRecord: false})
    }
    res.status(status.OK)
    res.body = serializers.locales.translations.list.serialize(translations)
    // res.body = serializers.locales.translations.listKv(translations)
    // res.body.meta = res.body.meta || {}
    // res.body.meta.fromCache = Boolean(cache)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  list,
  listTranslations
}
