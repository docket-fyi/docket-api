const express = require('express')
// const httpStatus = require('http-status')
// const debug = require('debug')('app:api')

const { devices } = require('../controllers')
// const { Device } = require('../../models')

const router = express.Router()

router.get('/devices/:deviceId', devices.show)
router.post('/devices', devices.create)
router.put('/devices/:deviceId', devices.update)
router.delete('/devices/:deviceId', devices.destroy)

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
