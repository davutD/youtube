const sessionMiddleware = require('../middleware/session')

const onlineUsers = new Map()

function initializeSocket(io) {
  io.engine.use(sessionMiddleware)

  io.on('connection', (socket) => {
    const session = socket.request.session

    if (session.user) {
      const userId = session.user._id
      console.log(`✅ User connected: ${userId} with socket ID: ${socket.id}`)

      onlineUsers.set(userId, socket.id)

      socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${userId}`)
        onlineUsers.delete(userId)
      })
    } else {
      console.log('🔗 Anonymous socket connected:', socket.id)
      socket.on('disconnect', () => {
        console.log('🔗 Anonymous socket disconnected:', socket.id)
      })
    }
  })
}

module.exports = { initializeSocket, onlineUsers }
