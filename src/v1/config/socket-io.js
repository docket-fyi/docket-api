const socketIO = require('socket.io')

// const debug = require('./debug').socketio
// const server = require('./server')

const options = {
  serveClient: false // @todo This doesn't seem to be respected...?
}
const io = new socketIO(/*server, */options)

module.exports = io
