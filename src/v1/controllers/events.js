const debug = require('debug')('app:api')
const httpStatus = require('http-status')
const moment = require('moment')

const { Event } = require('../../models')

async function index(req, res, next) {
  const { device } = req
  try {
    const fields = {
      _id: false,
      name: true,
      date: true
    }
    const events = await Event.find({ deviceId: device.id }, fields).exec()
    res.status(httpStatus.OK).json(events)
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function show(req, res, next) {
  try {
    res.status(httpStatus.OK).json({show: 'events ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function create(req, res, next) {
  const { body, device } = req
  const { name, date } = body
  try {
    const event = await Event.create({
      deviceId: device.id,
      name,
      date: moment(date)
    })
    res.status(httpStatus.OK).json({create: 'events ok', event})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function update(req, res, next) {
  try {
    res.status(httpStatus.OK).json({update: 'events ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function destroy(req, res, next) {
  try {
    res.status(httpStatus.OK).json({destroy: 'events ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
