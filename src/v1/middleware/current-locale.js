const acceptLanguage = require('accept-language')

const debug = require('../config/debug').api
const { Locale } = require('../../models')

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
    const supportedLocales = await Locale.distinct('code')
    acceptLanguage.languages(supportedLocales)
    const code = acceptLanguage.get(acceptLanguageHeader)
    const locale = await Locale.findOne({ code })
    /**
     * Intentionally not performing the following check because users should
     * be able to carry on even if they are using an unsupported language.
     *
    if (!locale) {
      res.status(status.BAD_REQUEST)
      throw new LocaleNotFoundError()
    }
    */
    req.currentLocale = locale // NOTE: It's possible for this to be `null`
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
