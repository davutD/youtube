require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
require('./mongo-connection')
const bodyParser = require('body-parser')

const errorHandler = require('./middleware/error-handler')
const sessionMiddleware = require('./middleware/session')
const { initializeSocket } = require('./socket/handler')

const NotificationService = require('./services/notification/notification-service')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const notificationService = new NotificationService(io)
module.exports.notificationService = notificationService

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const videosRouter = require('./routes/videos')
const commentsRouter = require('./routes/comments')
const indexRouter = require('./routes/index')

initializeSocket(io)

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(sessionMiddleware)

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/videos', videosRouter)
app.use('/comments', commentsRouter)
app.use('/', indexRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
