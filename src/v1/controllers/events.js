const httpStatus = require('http-status')
const moment = require('moment')

const { Event } = require('../../models')

/**
 * Fetches all events from the database and returns them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
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
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attemps to find an event and, if found, returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function show(req, res, next) {
  try {
    res.status(httpStatus.OK).json({show: 'events ok'})
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to create a new event and, if valid, saves it to the database,
 * and returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
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
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to update an event and, if found and valid, returns the newly
 * updated event.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function update(req, res, next) {
  try {
    res.status(httpStatus.OK).json({update: 'events ok'})
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to find an event and, if found, deletes it from the database.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function destroy(req, res, next) {
  try {
    res.status(httpStatus.OK).json({destroy: 'events ok'})
    return next()
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
