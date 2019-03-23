const express = require('express')

const { verifyJwt, currentUser } = require('../middleware')
const { microsoft } = require('../controllers')

const router = express.Router()

router.get('/microsoft/oauth-url', verifyJwt, currentUser, microsoft.getOAuthUrl)
router.get('/microsoft/tokens', verifyJwt, currentUser, microsoft.getAccessTokens)
router.get('/microsoft/calendar-list', verifyJwt, currentUser, microsoft.getAllCalendarListsWithEvents) // Returns the calendars on the user's calendar list.
router.get('/microsoft/calendars/:calendarId/events', verifyJwt, currentUser, microsoft.getAllEvents) // Returns events on the specified calendar.

module.exports = router
