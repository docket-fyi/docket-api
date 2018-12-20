const express = require('express')
const status = require('http-status')

const { devices } = require('../controllers')
const { DeviceNotFoundError } = require('../errors')
const validations = require('./validations').devices
const { Device } = require('../../models')

const router = express.Router()

router.get('/devices/:deviceId', validations['/devices/:deviceId'].get, devices.show)
router.post('/devices', validations['/devices'].post, devices.create)
router.put('/devices/:deviceId', validations['/devices/:deviceId'].put, devices.update)
router.delete('/devices/:deviceId', validations['/devices/:deviceId'].delete, devices.destroy)

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

module.exports = router
