const express = require('express')
const status = require('http-status')

const { my } = require('../controllers')
const validations = require('./validations').my
const { verifyJwt, currentUser, setSentryContext, jsonApiDeserializer } = require('../middleware')
const errors = require('../errors')
const { Event } = require('../models')

const router = express.Router()

async function setEvent(req, res, next) {
  try {
    const { params, currentUser } = req
    const event = await Event.findOne({
      where: {
        id: params.eventId,
        userId: currentUser.id
      }
    })
    if (!event) {
      res.status(status.NOT_FOUND)
      throw new errors.events.NotFoundError()
    }
    req.event = event // eslint-disable-line require-atomic-updates
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * IMPORTANT: All "my" endpoints need to first pass through the verifyJwt
 * and currentUser middleware.
 */
router.get('/my/profile', verifyJwt, currentUser, setSentryContext, my.show)
router.patch('/my/profile', verifyJwt, validations['/my/profile'].patch, currentUser, setSentryContext, my.update)
router.delete('/my/profile', verifyJwt, currentUser, setSentryContext, my.destroy)

router.get('/my/events', verifyJwt, currentUser, setSentryContext, my.listEvents)
router.post('/my/events', verifyJwt, validations['/my/events'].post, currentUser, setSentryContext, jsonApiDeserializer, my.createEvent)
router.post('/my/events/import', verifyJwt, validations['/my/events/import'].post, currentUser, setSentryContext, my.importEvents)
router.get('/my/events/:eventId', verifyJwt, currentUser, setEvent, setSentryContext, my.showEvent)
router.patch('/my/events/:eventId', verifyJwt, validations['/my/events/:eventId'].patch, currentUser, setEvent, setSentryContext, jsonApiDeserializer, my.updateEvent)
router.delete('/my/events/:eventId', verifyJwt, currentUser, setEvent, setSentryContext, my.destroyEvent)

router.get('/my/membership', verifyJwt, currentUser, setSentryContext, my.showMembership)
router.patch('/my/membership', verifyJwt, currentUser, setSentryContext, my.updateMembership)

module.exports = router
