/* eslint-disable max-lines, no-warning-comments */

const status = require('http-status')
const moment = require('moment')
const slugify = require('slugify')
const Sentry = require('@sentry/node')
const uuid = require('uuid/v4')

const { Event } = require('../models')
const { createEventReminder } = require('../config/redis')
const errors = require('../errors')
const serializers = require('../serializers')
// const elasticsearch = require('../config/elasticsearch')
// const stripe = require('../config/stripe')

/**
 * Returns the current user.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return  {Promise<undefined>}
 * @swagger
 * /my/profile:
 *   get:
 *     summary: Return the current user's profile
 *     description: Return the current user's profile
 *     operationId: getMyProfile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMyProfileOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function show(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'show')
  })
  try {
    const { currentUser } = req
    res.status(status.OK)
    res.body = serializers.my.show.serialize(currentUser)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/profile:
 *   patch:
 *     summary: Update the current user's profile
 *     description: Update the current user's profile
 *     operationId: updateMyProfile
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User update parameters
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - attributes
 *                 properties:
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       preferredMeasurementUnit:
 *                         type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateMyProfileOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function update(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'update')
  })
  try {
    const { currentUser, deserializedBody } = req
    const { firstName, lastName, email, preferredMeasurementUnit } = deserializedBody
    currentUser.set({
      firstName,
      lastName,
      email, // TODO: Think this through
      preferredMeasurementUnit
    })
    const updatedUser = await currentUser.save()
    res.status(status.OK)
    res.body = serializers.my.update.serialize(updatedUser)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/profile:
 *   delete:
 *     summary: Delete the current user
 *     description: Delete the current user
 *     operationId: destroyMyProfile
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function destroy(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'destroy')
  })
  try {
    const { currentUser } = req
    const deleteCurrentUser = currentUser.destroy()
    const deleteAllEventsForCurrentUser = Event.deleteMany({
      where: {
        userId: currentUser.id
      }
    })
    await Promise.all([deleteCurrentUser, deleteAllEventsForCurrentUser])
    res.status(status.NO_CONTENT)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events:
 *   get:
 *     summary: List the current user's events
 *     description: List the current user's events
 *     operationId: listMyEvents
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ListMyEventsOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function listEvents(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'listEvents')
  })
  try {
    const { currentUser } = req
    const events = await Event.findAll({
      where: {
        userId: currentUser.id
      }
    }) // TODO: Pagination (limit & offset query params)
    // const eventsWithDiff = events.map(event => ({
    //   ...event.toObject(),
    //   diff: currentUser.eventDiff(event)
    // }))
    res.status(status.OK)
    res.body = serializers.my.events.list.serialize(events)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events/{eventId}:
 *   get:
 *     summary: Get an event for the current user by it's ID
 *     description: Get an event for the current user by it's ID
 *     operationId: getMyEventById
 *     tags:
 *       - Events
 *     parameters:
 *       - $ref: '#/components/parameters/GetMyEventEventIdPathParameter'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMyEventOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function showEvent(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'showEvent')
  })
  try {
    const { event } = req
    res.status(status.OK)
    res.body = serializers.my.events.show.serialize(event)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events:
 *   post:
 *     summary: Create a new event for the current user
 *     description: Create a new event for the current user
 *     operationId: createMyEvent
 *     tags:
 *       - Events
 *     requestBody:
 *       description: Event creation parameters
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - attributes
 *                 properties:
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       date:
 *                         type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateEventOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function createEvent(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'createEvent')
  })
  try {
    const { deserializedBody, currentUser } = req
    const { name, date /*, reminders*/ } = deserializedBody
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
      slug: slugify(name, {lower: true, remove: /[/*+~.()'"!:@]/g}),
      uuid: uuid()
    })
    /*
    if (!currentUser.isPremium) {
      reminders.slice(0..2)
    }
    reminders.forEach(reminder => {
      createEventReminder(key, expiration)
    })
    */
    // await elasticsearch.index({
    //   index: 'docket',
    //   refresh: true,
    //   body: {
    //     ...event.toJSON()
    //   }
    // })
    createEventReminder(`docket:users:${currentUser.id}:events:${event.id}`, 10 /*moment(date).add(10, 'seconds')*/)
    res.status(status.OK)
    res.body = serializers.my.events.create.serialize(event)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events/import:
 *   post:
 *     summary: Bulk import events for the current user
 *     description: Bulk import events for the current user
 *     operationId: importMyEvents
 *     tags:
 *       - Events
 *     requestBody:
 *       description: Event import parameters
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     attributes:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         date:
 *                           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ImportMyEventsOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function importEvents(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'importEvents')
  })
  try {
    const { body, currentUser } = req
    const { events } = body
    if (!Array.isArray(events)) {
      res.status(status.BAD_REQUEST)
      throw new errors.events.ImportedEventsNotArrayError()
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
    res.status(status.OK)
    res.body = serializers.my.events.import.serialize(newEvents)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events/{eventId}:
 *   patch:
 *     summary: Update an event for the current user by it's ID
 *     description: Update an event for the current user by it's ID
 *     operationId: updateMyEventById
 *     tags:
 *       - Events
 *     parameters:
 *       - $ref: '#/components/parameters/UpdateMyEventEventIdPathParameter'
 *     requestBody:
 *       description: Event update parameters
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - attributes
 *                 properties:
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       date:
 *                         type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateMyEventOkResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function updateEvent(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'updateEvent')
  })
  try {
    const { event, deserializedBody } = req
    const updatedEvent = await event.update(deserializedBody)
    res.status(status.OK)
    res.body = serializers.my.events.update.serialize(updatedEvent)
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
 * @return  {Promise<undefined>}
 * @swagger
 * /my/events/{eventId}:
 *   delete:
 *     summary: Delete an event for the current user by it's ID
 *     description: Delete an event for the current user by it's ID
 *     operationId: deleteMyEventById
 *     tags:
 *       - Events
 *     parameters:
 *       - $ref: '#/components/parameters/DeleteMyEventEventIdPathParameter'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function destroyEvent(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'destroyEvent')
  })
  try {
    const { event } = req
    await event.destroy()
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Get the current user's membership details.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return  {Promise<undefined>}
 * @swagger
 * /my/membership:
 *   get:
 *     summary: Get the current user's membership status
 *     description: Get the current user's membership status
 *     operationId: showMyMembership
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function showMembership(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'showMembership')
  })
  try {
    // const { currentUser } = req
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Update the current user's membership details.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return  {Promise<undefined>}
 * @swagger
 * /my/membership:
 *   patch:
 *     summary: Update the current user's membership status
 *     description: Update the current user's membership status
 *     operationId: updateMyMembership
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         $ref: '#/components/responses/NoContentResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestResponse'
 */
async function updateMembership(req, res, next) {
  Sentry.configureScope(scope => {
    scope.setTag('controller', 'my')
    scope.setTag('action', 'updateMembership')
  })
  try {
    // const { currentUser } = req
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  show,
  update,
  destroy,
  listEvents,
  showEvent,
  createEvent,
  importEvents,
  updateEvent,
  destroyEvent,
  showMembership,
  updateMembership
}
