const express = require('express')
const httpStatus = require('http-status')
const debug = require('debug')('app:api')

const { events } = require('../controllers')
const { Device, Event } = require('../../models')

const router = express.Router()

router.get('/:deviceId/events', events.index)
router.get('/:deviceId/events/:eventId', events.show)
router.post('/:deviceId/events', events.create)
router.put('/:deviceId/events/:eventId', events.update)
router.delete('/:deviceId/events/:eventId', events.destroy)

router.param('deviceId', async (req, res, next, id) => {
  try {
    const device = await Device.findOne({ id }).exec()
    if (device) {
      req.device = device
      next()
      return
    }
    // const err = new DeviceNotFoundError()
    // next(err)
    const json = {
      errors: [
        {
          name: httpStatus[404],
          message: 'Device not found'
        }
      ]
    }
    res.status(httpStatus.NOT_FOUND).json(json)
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.NOT_FOUND} ${httpStatus[404]})`)
  } catch (err) {
    return next(err)
  }
})

router.param('eventId', async (req, res, next, id) => {
  try {
    const event = await Event.findOne({ id }).exec()
    if (event) {
      req.event = event
      next()
      return
    }
    // const err = new EventNotFoundError()
    // next(err)
    const json = {
      errors: [
        {
          name: httpStatus[404],
          message: 'Event not found'
        }
      ]
    }
    res.status(httpStatus.NOT_FOUND).json(json)
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.NOT_FOUND} ${httpStatus[404]})`)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
