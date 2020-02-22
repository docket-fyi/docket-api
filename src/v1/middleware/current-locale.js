const acceptLanguage = require('accept-language')

// const debug = require('../config/debug').api
const Secret = require('../config/secret')
const logger = require('../config/logger')
const { getLocaleModel } = require('../models')
// const environment = require('../environment')
const { getPrimaryInstance } = require('../config/redis')
const cacheKeys = require('../config/cache-keys')

let FALLBACK_LOCALE = null

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

    const Locale = await getLocaleModel()
    const redis = await getPrimaryInstance()
    if (!FALLBACK_LOCALE) {
      FALLBACK_LOCALE = await Secret.get('api', 'FALLBACK_LOCALE') // eslint-disable-line require-atomic-updates
    }
    const defaultTtl = await Secret.get('redis', 'REDIS_DEFAULT_CACHE_TTL_SECONDS')

    let fallbackLocale = null
    const fallbackLocaleCache = await redis.get(cacheKeys.locales.show(FALLBACK_LOCALE))
    if (!fallbackLocaleCache) {
      fallbackLocale = await Locale.findOne({
        where: {
          code: 'en-US'
        }
      })
      if (fallbackLocale) {
        const fallbackLocaleAsJson = fallbackLocale.toJSON()
        const fallbackLocaleAsString = JSON.stringify(fallbackLocaleAsJson)
        await redis.setex(cacheKeys.locales.show(FALLBACK_LOCALE), defaultTtl, fallbackLocaleAsString)
      } else {
        fallbackLocale = 'en-US'
      }
    } else {
      fallbackLocale = Locale.build(JSON.parse(fallbackLocaleCache), {newRecord: false})
    }

    let supportedLocales = null
    const supportedLocalesCache = await redis.get(cacheKeys.locales.list)
    if (!supportedLocalesCache) {
      supportedLocales = await Locale.findAll()
      if (supportedLocales.length) {
        const supportedLocalesAsJson = supportedLocales.map(locale => locale.toJSON())
        const supportedLocalesAsString = JSON.stringify(supportedLocalesAsJson)
        await redis.setex(cacheKeys.locales.list, defaultTtl, supportedLocalesAsString)
      } else {
        supportedLocales = [
          {
            code: 'en-US'
          }
        ]
      }
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
      if (locale) {
        const localeAsJson = locale.toJSON()
        const localeAsString = JSON.stringify(localeAsJson)
        await redis.setex(cacheKeys.locales.show(code), defaultTtl, localeAsString)
      } /*else {
        locale = {}
      }*/
    } else {
      locale = Locale.build(JSON.parse(localeCache), {newRecord: false})
    }

    req.currentLocale = locale || fallbackLocale // eslint-disable-line require-atomic-updates
    return next()
  } catch (err) {
    logger.error(err)
    /**
     * Don't pass `err` to next() because users should be able to carry
     * on even if a locale can't be found.
     */
    return next()
  }
}

module.exports = currentLocale
