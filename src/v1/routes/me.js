const express = require('express')
const status = require('http-status')

const { me } = require('../controllers')
const { verifyJwt, currentUser } = require('../middleware')
const { EventNotFoundError } = require('../errors')
const { Event } = require('../../models')

const router = express.Router()

/**
 * IMPORTANT: All "me" endpoints need to first pass through the verifyJwt
 * and currentUser middleware.
 */
router.get('/me', verifyJwt, currentUser, me.show)
router.get('/me/events', verifyJwt, currentUser, me.getAllEvents)
router.post('/me/events', verifyJwt, currentUser, me.createEvent)
router.put('/me/events/:id', verifyJwt, currentUser, me.updateEvent)
router.delete('/me/events/:id', verifyJwt, currentUser, me.destroyEvent)
router.put('/me', verifyJwt, currentUser, me.update)
router.delete('/me', verifyJwt, currentUser, me.destroy)

router.param('id', async (req, res, next, id) => {
  try {
    const event = await Event.findOne({ _id: id }).exec()
    if (!event) {
      res.status(status.NOT_FOUND)
      throw new EventNotFoundError()
    }
    req.event = event
    return next()
  } catch (err) {
    return next(err)
  }
})

module.exports = router
