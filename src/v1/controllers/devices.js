const debug = require('debug')('app:api')
const httpStatus = require('http-status')
const moment = require('moment')

const { Device } = require('../../models')

async function show(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ show: 'devices ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function create(req, res, next) {
  const { body } = req
  const { id } = body
  try {
    if (!id) throw new Error('Device ID is required')
    const now = moment()
    const device = await Device.create({
      id,
      createdAt: now,
      updatedAt: now
    })
    res.status(httpStatus.OK).json({ create: 'devices ok', device})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function update(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ update: 'devices ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

async function destroy(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ destroy: 'devices ok'})
    debug(`<- ${req.method} ${req.originalUrl} (${httpStatus.OK} ${httpStatus[200]})`)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  show,
  create,
  update,
  destroy
}
