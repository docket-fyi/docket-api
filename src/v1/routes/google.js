const express = require('express')

const { verifyJwt, currentUser, setGoogleOAuthCredentials } = require('../middleware')
const { google } = require('../controllers')

const router = express.Router()

router.get('/google/oauth-url', verifyJwt, currentUser, google.getOAuthUrl)
router.get('/google/tokens', verifyJwt, currentUser, google.getAccessTokens)

// @see https://developers.google.com/calendar/v3/reference/?authuser=1#CalendarList
// router.delete('/google/calendar-lists/:calendarListId', verifyJwt, currentUser, google.destroyCalendarList) // Removes a calendar from the user's calendar list.
router.get('/google/calendar-lists/:calendarListId', verifyJwt, currentUser, setGoogleOAuthCredentials, google.showCalendarList) // Returns a calendar from the user's calendar list.
// router.post('/google/calendar-lists', verifyJwt, currentUser, google.createCalendarList) // Inserts an existing calendar into the user's calendar list.
router.get('/google/calendar-lists', verifyJwt, currentUser, setGoogleOAuthCredentials, google.listCalendarLists) // Returns the calendars on the user's calendar list.
// router.patch('/google/calendar-lists/:calendarListId', verifyJwt, currentUser, google.updateCalendarList) // Updates an existing calendar on the user's calendar list; supports patch semantics.
// router.put('/google/calendar-lists/:calendarListId', verifyJwt, currentUser, google.replaceCalendarList) // Updates an existing calendar on the user's calendar list.
router.post('/google/calendar-lists/watch', verifyJwt, currentUser, google.watchCalendarLists) // Watch for changes to CalendarList resources.

// @see https://developers.google.com/calendar/v3/reference/?authuser=1#Calendars
// router.post('/google/calendars/:calendarId/clear', verifyJwt, currentUser, google.clearCalendar) // Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account.
// router.delete('/google/calendars/:calendarId', verifyJwt, currentUser, google.destroyCalendar) // Deletes a secondary calendar. Use calendars.clear for clearing all events on primary calendars.
router.get('/google/calendars/:calendarId', verifyJwt, currentUser, setGoogleOAuthCredentials, google.showCalendar) // Returns metadata for a calendar.
// router.post('/google/calendars', verifyJwt, currentUser, google.createCalendar) // Creates a secondary calendar.
// router.patch('/google/calendars/:calendarId', verifyJwt, currentUser, google.updateCalendar) // Updates metadata for a calendar; supports patch semantics.
// router.put('/google/calendars/:calendarId', verifyJwt, currentUser, google.replaceCalendar) // Updates metadata for a calendar.

// @see https://developers.google.com/calendar/v3/reference/?authuser=1#Events
// router.delete('/google/calendars/:calendarId/events/:eventId', verifyJwt, currentUser, google.destroyEvent) // Deletes an event.
router.get('/google/calendars/:calendarId/events/:eventId', verifyJwt, currentUser, setGoogleOAuthCredentials, google.showEvent) // Returns an event.
// router.post('/google/calendars/:calendarId/events/import', verifyJwt, currentUser, google.importEvent) // Imports an event. This operation is used to add a private copy of an existing event to a calendar.
// router.post('/google/calendars/:calendarId/events', verifyJwt, currentUser, google.createEvent) // Creates an event.
router.get('/google/calendars/:calendarId/events/:eventId/instances', verifyJwt, currentUser, setGoogleOAuthCredentials, google.listEventInstances) // Returns instances of the specified recurring event.
router.get('/google/calendars/:calendarId/events', verifyJwt, currentUser, setGoogleOAuthCredentials, google.listEvents) // Returns events on the specified calendar.
// router.post('/google/calendars/:calendarId/events/:eventId/move', verifyJwt, currentUser, google.moveEvent) // Moves an event to another calendar, i.e. changes an event's organizer.
// router.patch('/google/calendars/:calendarId/events/:eventId', verifyJwt, currentUser, google.updateEvent) // Updates an event; supports patch semantics.
// router.post('/google/calendars/:calendarId/events/quickAdd', verifyJwt, currentUser, google.quickAddEvent) // Creates an event based on a simple text string.
// router.put('/google/calendars/:calendarId/events/:eventId', verifyJwt, currentUser, google.replaceEvent) // Updates an event.
router.post('/google/calendars/:calendarId/events/watch', verifyJwt, currentUser, setGoogleOAuthCredentials, google.watchEvents) // Watch for changes to Events resources.

module.exports = router
