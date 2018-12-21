const express = require('express')
const status = require('http-status')

const { events } = require('../controllers')
const { Device, Event } = require('../../models')
const { DeviceNotFoundError, EventNotFoundError } = require('../errors')

const router = express.Router()

router.get('/:deviceId/events', events.index)
router.get('/:deviceId/events/:eventId', events.show)
router.post('/:deviceId/events', events.create)
router.put('/:deviceId/events/:eventId', events.update)
router.delete('/:deviceId/events/:eventId', events.destroy)

router.param('deviceId', async (req, res, next, id) => {
  try {
    const device = await Device.findOne({ _id: id }).exec()
    if (!device) {
      res.status(status.NOT_FOUND)
      throw new DeviceNotFoundError()
    }
    req.device = device
    return next()
  } catch (err) {
    return next(err)
  }
})

router.param('eventId', async (req, res, next, id) => {
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
