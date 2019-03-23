const io = require('../config/socket-io')

/**
 * Attaches the SocketIO server object to the incoming request.
 *
 * @param {Request} req The incoming request object
 * @param {Response} res The outgoing response object
 * @param {Function} next Callback to continue on to next middleware
 *
 * @return  {undefined}
 */
function socketIO(req, res, next) {
  req.io = io
  next()
}

module.exports = socketIO
