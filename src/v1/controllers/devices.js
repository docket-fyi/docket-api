const httpStatus = require('http-status')

const { Device } = require('../../models')

/**
 * Attemps to find a device and, if found, returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function show(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ show: 'devices ok'})
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to create a new device and, if valid, saves it to the database,
 * and returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function create(req, res, next) {
  const { body } = req
  const { id } = body
  try {
    if (!id) throw new Error('Device ID is required')
    const device = await Device.create({
      id
    })
    res.status(httpStatus.OK).json({ create: 'devices ok', device})
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to update a device and, if found and valid, returns the newly
 * updated device.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function update(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ update: 'devices ok'})
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to find a device and, if found, deletes it from the database.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function destroy(req, res, next) {
  try {
    res.status(httpStatus.OK).json({ destroy: 'devices ok'})
    return next()
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
