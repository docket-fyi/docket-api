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
 *     summary:
 *     description:
 *     operationId: listLocales
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Locales
 *     responses:
 *       200:
 *         $ref: '#/responses/ListLocalesOkResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
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
      locales = Locale.build(JSON.parse(cache))
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
 *     summary:
 *     description:
 *     operationId: listTranslationsByLocale
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Translations
 *     parameters:
 *       - $ref: '#/parameters/ListTranslationsByLocaleCodePathParameter'
 *     responses:
 *       200:
 *         $ref: '#/responses/ListTranslationsByLocaleOkResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
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
      translations = Translation.build(JSON.parse(cache))
    }
    res.status(status.OK)
    res.body = serializers.locales.translations.list.serialize(translations)
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
