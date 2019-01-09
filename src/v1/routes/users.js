const express = require('express')
// const status = require('http-status')

const { users } = require('../controllers')
// const { User } = require('../../models')
// const { UserNotFoundError } = require('../errors')

const router = express.Router()

// router.get('/users', users.index)
// router.get('/users/:id', users.show)
router.post('/users', users.create)
router.get('/users/confirm/:code', users.confirmRegistration)
router.post('/users/forgot-password', users.forgotPassword)
router.post('/users/reset-password', users.resetPassword)
// router.put('/users/:id', users.update)
// router.delete('/users/:id', users.destroy)

// router.param('id', async (req, res, next, id) => {
//   try {
//     const user = await User.findOne({ _id: id }).exec()
//     if (!user) {
//       res.status(status.NOT_FOUND)
//       throw new UserNotFoundError()
//     }
//     req.user = user
//     return next()
//   } catch (err) {
//     return next(err)
//   }
// })

module.exports = router
