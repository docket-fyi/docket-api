const Sentry = require('@sentry/node')

/**
 * [setSentryUser description]
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function setSentryUser(req, res, next) {
  try {
    const { currentUser } = req
    if (!currentUser) {
      return next()
    }
    Sentry.configureScope(scope => {
      scope.setUser({
        id: currentUser.id,
        email: currentUser.email
      })
      // scope.setTag()
      // scope.setLevel()
      // scope.setExtra()
    })
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = setSentryUser
