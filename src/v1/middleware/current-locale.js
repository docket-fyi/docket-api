const acceptLanguage = require('accept-language')

const debug = require('../config/debug').api
const { Locale } = require('../models')
const environment = require('../environment')
const redis = require('../config/redis').primary
const cacheKeys = require('../config/cache-keys')

const FALLBACK_LOCALE = environment.api.fallbackLocale

/**
 * Inspects the 'Accept-Language' request header to determine a closest
 * supported match and attaches the locale to the request.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function currentLocale(req, res, next) {
  try {
    const acceptLanguageHeader = req.get('Accept-Language')

    let fallbackLocale = null
    const fallbackLocaleCache = await redis.get(cacheKeys.locales.show(FALLBACK_LOCALE))
    if (!fallbackLocaleCache) {
      fallbackLocale = await Locale.findOne({
        where: {
          code: 'en-US'
        }
      })
      const fallbackLocaleAsJson = fallbackLocale.toJSON()
      const fallbackLocaleAsString = JSON.stringify(fallbackLocaleAsJson)
      await redis.setex(cacheKeys.locales.show(FALLBACK_LOCALE), environment.redis.defaultTtl, fallbackLocaleAsString)
    } else {
      fallbackLocale = Locale.build(JSON.parse(fallbackLocaleCache), {newRecord: false})
    }

    let supportedLocales = null
    const supportedLocalesCache = await redis.get(cacheKeys.locales.list)
    if (!supportedLocalesCache) {
      supportedLocales = await Locale.findAll()
      const supportedLocalesAsJson = supportedLocales.map(locale => locale.toJSON())
      const supportedLocalesAsString = JSON.stringify(supportedLocalesAsJson)
      await redis.setex(cacheKeys.locales.list, environment.redis.defaultTtl, supportedLocalesAsString)
    } else {
      supportedLocales = JSON.parse(supportedLocalesCache).map(locale => Locale.build(locale, {newRecord: false}))
    }

    const supportedLocalesAsJson = supportedLocales.map(locale => locale.code)
    acceptLanguage.languages(supportedLocalesAsJson)
    const code = acceptLanguage.get(acceptLanguageHeader)

    let locale = null
    const localeCache = await redis.get(cacheKeys.locales.show(code))
    if (!localeCache) {
      locale = await Locale.findOne({
        where: {
          code
        }
      })
     const localeAsJson = locale.toJSON()
     const localeAsString = JSON.stringify(localeAsJson)
     await redis.setex(cacheKeys.locales.show(code), environment.redis.defaultTtl, localeAsString)
    } else {
      locale = Locale.build(JSON.parse(localeCache), {newRecord: false})
    }

    req.currentLocale = locale || fallbackLocale // eslint-disable-line require-atomic-updates
    return next()
  } catch (err) {
    debug(`${err.name}: ${err.message}`)
    /**
     * Don't pass `err` to next() because users should be able to carry
     * on even if a locale can't be found.
     */
    return next()
  }
}

module.exports = currentLocale
