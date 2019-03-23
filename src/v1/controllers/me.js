const status = require('http-status')
const moment = require('moment')
const slugify = require('slugify')

const { Event } = require('../../models')
const { createEventReminder } = require('../config/redis')
const { ImportedEventsNotArrayError } = require('../errors')

/**
 * Returns the current user.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function show(req, res, next) {
  try {
    const { currentUser } = req
    res.status(status.OK).json(currentUser)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Attempts to update the current user and, if found and valid, returns
 * the newly updated user.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function update(req, res, next) {
  try {
    const { currentUser, body } = req
    const { firstName, lastName, email, preferredMeasurementUnit } = body
    currentUser.set({
      firstName,
      lastName,
      email,
      preferredMeasurementUnit
    })
    const updatedUser = await currentUser.save()
    const json = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      preferredMeasurementUnit: updatedUser.preferredMeasurementUnit
    }
    res.status(status.OK).json(json)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Deletes the current user and all associated events from the database.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function destroy(req, res, next) {
  try {
    const { currentUser } = req
    const { id } = currentUser
    const deleteCurrentUser = currentUser.remove()
    const deleteAllEvents = Event.deleteMany({ userId: id })
    await Promise.all([deleteCurrentUser, deleteAllEvents])
    res.status(status.NO_CONTENT).send()
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Fetches all events from the database for the current user and returns
 * them.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function getAllEvents(req, res, next) {
  try {
    const { currentUser } = req
    const fields = {
      _id: true,
      name: true,
      slug: true,
      date: true
    }
    const events = await Event.find({ userId: currentUser.id }, fields).exec() // @todo limit, offset
    const eventsWithDiff = events.map(event => ({
      ...event.toObject(),
      diff: currentUser.eventDiff(event)
    }))
    res.status(status.OK).json(eventsWithDiff)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Fetches a specific events from the database for the current user and
 * returns it.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {Promise<undefined>}
 */
async function getEvent(req, res, next) {
  try {
    const { event } = req
    res.status(status.OK).json(event)
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
async function createEvent(req, res, next) {
  try {
    const { body, currentUser } = req
    const { name, date /*, reminders*/ } = body
    /*
    Repeat every <X> day/week/month/year
      week -> Su/M/Tu/W/Th/F/S
      month -> day <X>/first <day>
    Ends never/on/after
      on -> date
      after -> <X> occurrences
    From now <X> day/week/month/year
    From date <X> day/week/month/year

    Canned reminders:
      1 day before
      1 week before
      1 month before
      1 year before
    */
    const event = await Event.create({
      userId: currentUser.id,
      name,
      date: moment(date),
      slug: slugify(name, {lower: true, remove: /[/*+~.()'"!:@]/g})
    })
    /*
    if (!currentUser.isPremium) {
      reminders.slice(0..2)
    }
    reminders.forEach(reminder => {
      createEventReminder(key, expiration)
    })
    */
    createEventReminder(`users:${currentUser._id}:events:${event._id}`, 10 /*moment(date).add(10, 'seconds')*/)
    // createEventReminderForUser(currentUser, event, moment(date).add(10, 'seconds'))
    const eventWithDiff = {
      ...event.toObject(),
      diff: currentUser.eventDiff(event)
    }
    res.status(status.OK).json(eventWithDiff)
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
async function importEvents(req, res, next) {
  try {
    const { body, currentUser } = req
    const { events } = body
    if (!Array.isArray(events)) {
      res.status(status.BAD_REQUEST)
      throw new ImportedEventsNotArrayError()
    }
    const decoratedEvents = events.map(event => {
      const { name, date } = event
      return {
        userId: currentUser.id,
        name,
        date: moment(date),
        slug: slugify(name, {lower: true, remove: /[/*+~.()'"!:@]/g})
      }
    })
    const newEvents = await Event.create(decoratedEvents)
    // const eventsWithDiff = {
    //   ...event.toObject(),
    //   diff: currentUser.eventDiff(event)
    // }
    res.status(status.OK).json(newEvents)
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
async function updateEvent(req, res, next) {
  try {
    const { event, body } = req
    const { name, date } = body
    event.set({
      name,
      date
    })
    const updatedEvent = await event.save()
    const json = {
      id: updatedEvent.id,
      name: updatedEvent.name,
      date: updatedEvent.date,
    }
    res.status(status.OK).json(json)
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
async function destroyEvent(req, res, next) {
  try {
    const { event } = req
    await event.remove()
    res.status(status.NO_CONTENT).send()
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  show,
  update,
  destroy,
  getAllEvents,
  getEvent,
  createEvent,
  importEvents,
  updateEvent,
  destroyEvent
}
