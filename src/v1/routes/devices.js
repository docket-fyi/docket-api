const express = require('express')
// const httpStatus = require('http-status')
// const debug = require('debug')('app:api')

const controller = require('../controllers').devices
const validations = require('./validations').devices
// const { Device } = require('../../models')

const router = express.Router()

router.get('/devices/:deviceId', validations['/devices/:deviceId'].get, controller.show)
router.post('/devices', validations['/devices'].post, controller.create)
router.put('/devices/:deviceId', validations['/devices/:deviceId'].put, controller.update)
router.delete('/devices/:deviceId', validations['/devices/:deviceId'].delete, controller.destroy)

// router.param('deviceId', async (req, res, next, id) => {
//   try {
//     const device = await Device.findOne({ id }).exec()
//     if (device) {
//       req.device = device
//       next()
//       return
//     }
//     // const err = new DeviceNotFoundError()
//     // next(err)
//     const json = {
//       errors: [
//         {
//           name: httpStatus[404],
//           message: 'Device not found'
//         }
//       ]
//     }
//     res.status(httpStatus.NOT_FOUND).json(json)
//     debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.NOT_FOUND} ${httpStatus[404]})`)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
