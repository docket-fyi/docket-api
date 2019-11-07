const Sentry = require('@sentry/node')
const status = require('http-status')

const { Locale, Translation } = require('../models')
const serializers = require('../serializers')

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
    const locales = await Locale.findAll()
    res.status(status.OK)
    res.body = serializers.locales.list.serialize(locales)
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
    const translations = await Translation.findAll({
      where: {
        localeId: locale.id
      }
    })
    res.status(status.OK)
    res.body = serializers.locales.translations.list.serialize(translations)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  list,
  listTranslations
}
