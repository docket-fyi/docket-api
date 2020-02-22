const status = require('http-status')

const Secret = require('../config/secret')
const { getUserModel } = require('../models')
const errors = require('../errors')
const { getPrimaryInstance } = require('../config/redis')
const cacheKeys = require('../config/cache-keys')

/**
 * Handler for unknown routes.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function currentUser(req, res, next) {
  try {
    const { jwt } = req
    if (!jwt) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.MissingJwtError()
    }
    const { id } = jwt
    if (!id) {
      res.status(status.BAD_REQUEST)
      throw new errors.authentication.MalformedJwtError()
    }
    let currentUser = null
    const redis = await getPrimaryInstance()
    const User = await getUserModel()
    const cache = await redis.get(cacheKeys.users.show(id))
    if (!cache) {
      currentUser = await User.findOne({
        where: {
          id
        }
      })
      if (!currentUser) {
        res.status(status.FORBIDDEN)
        throw new errors.users.NotFoundError()
      }
      const defaultTtl = await Secret.get('redis', 'REDIS_DEFAULT_CACHE_TTL_SECONDS')
      await redis.setex(cacheKeys.users.show(currentUser.id), defaultTtl, JSON.stringify(currentUser.toJSON()))
    } else {
      currentUser = User.build(JSON.parse(cache), {isNewRecord: false})
    }
    req.currentUser = currentUser // eslint-disable-line require-atomic-updates
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = currentUser
