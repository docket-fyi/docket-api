/* eslint-disable max-lines */

const status = require('http-status')
const { google } = require('googleapis')
const moment = require('moment')

const environment = require('../environment')
const oauth2Client = require('../config/google')
const errors = require('../errors')
const serializers = require('../serializers')

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/oauth-url:
 *   get:
 *     summary: Get the OAuth2 URL for Google services
 *     description: Get the OAuth2 URL for Google services
 *     operationId: getGoogleOAuthUrl
 *     consumes:
 *       - application/vnd.api+json
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     responses:
 *       200:
 *         $ref: '#/responses/GoogleOAuthUrlOkResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function getOAuthUrl(req, res, next) {
  try {
    const url = oauth2Client.generateAuthUrl({
      // access_type: 'online|offline',
      scope: environment.google.scopes()
    })
    res.status(status.OK)
    res.body = serializers.google.oauthUrl.serialize({ url })
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns the OAuth2 URL for Google services.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/tokens:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleGetAccessTokens
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/MicrosoftGetAccessTokensCodeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function getAccessTokens(req, res, next) {
  try {
    const { query, currentUser } = req
    const { code } = query
    if (!code) {
      res.status(status.BAD_REQUEST)
      throw new errors.google.OAuthMissingAuthorizationCodeError()
    }
    const { tokens } = await oauth2Client.getToken(code)
    await currentUser.updateOne({google: tokens})
    res.status(status.NO_CONTENT)
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function destroyCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists/{calendarListId}:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleShowCalendarListById
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function showCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function createCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleListCalendarLists
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function listCalendarLists(req, res, next) {
  try {
    const { query } = req
    const { include } = query
    const calendar = google.calendar({version: 'v3', auth: oauth2Client})
    const calendarListResponse = await calendar.calendarList.list()
    const calendarListItems = calendarListResponse.data.items.map(item => {
      const { id, summary, timeZone, backgroundColor, foregroundColor } = item
      return {
        id,
        summary,
        timeZone,
        backgroundColor,
        foregroundColor
      }
    })
    if (include === 'events') { // TODO: Make more dynamic
      const now = moment()
      for (const calendarListItem of calendarListItems) {
        const options = {
          calendarId: calendarListItem.id,
          timeMin: now.format(), // TODO: Consider historical events
          timeMax: now.add(1, 'year').format() // TODO: Make this configurable (1d, 1w, 1m, 1y, max, etc.)
        }
        const eventListResponse = await calendar.events.list(options) // eslint-disable-line no-await-in-loop
        calendarListItem.events = eventListResponse.data.items
      }
    }
    res.status(status.OK)
    res.body = calendarListItems
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function updateCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceCalendarList(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars-lists/watch:
 *   post:
 *     summary:
 *     description:
 *     operationId: googleWatchCalendarLists
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function watchCalendarLists(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function clearCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function destroyCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleShowCalendarById
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function showCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function createCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function updateCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceCalendar(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function destroyEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events/{eventId}:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleWatchCalendarLists
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function showEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function importEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function createEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events/{eventId}/instances:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleListEventInstances
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function listEventInstances(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/{calendarId}/events:
 *   get:
 *     summary:
 *     description:
 *     operationId: googleListEvents
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function listEvents(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

/*
async function moveEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function updateEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function quickAddEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/*
async function replaceEvent(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}
*/

/**
 * Returns...
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 * @return {Promise<undefined>}
 * @swagger
 * /google/calendars/:calendarId/events/watch:
 *   post:
 *     summary:
 *     description:
 *     operationId: googleWatchEvents
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/vnd.api+json
 *     tags:
 *       - Google
 *     parameters:
 *       - $ref: '#/parameters/GoogleListCalendarListsIncludeQueryParameter'
 *     responses:
 *       204:
 *         $ref: '#/responses/NoContentResponse'
 *       400:
 *         $ref: '#/responses/BadRequestResponse'
 */
async function watchEvents(req, res, next) {
  try {
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getOAuthUrl,
  getAccessTokens,
  // destroyCalendarList,
  showCalendarList,
  // createCalendarList,
  listCalendarLists,
  // updateCalendarList,
  // replaceCalendarList,
  watchCalendarLists,
  // clearCalendar,
  // destroyCalendar,
  showCalendar,
  // createCalendar,
  // updateCalendar,
  // replaceCalendar,
  // destroyEvent,
  showEvent,
  // importEvent,
  // createEvent,
  listEventInstances,
  listEvents,
  // moveEvent,
  // updateEvent,
  // quickAddEvent,
  // replaceEvent,
  watchEvents
}
