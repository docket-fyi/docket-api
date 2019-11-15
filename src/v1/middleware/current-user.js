const status = require('http-status')

const { User } = require('../models')
const errors = require('../errors')
const redis = require('../config/redis').primary
const cacheKeys = require('../config/cache-keys')
const environment = require('../environment')

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
      await redis.setex(cacheKeys.users.show(currentUser.id), environment.redis.defaultTtl, JSON.stringify(currentUser.toJSON()))
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
