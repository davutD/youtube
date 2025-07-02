require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const videosRouter = require('./routes/videos')
const commentsRouter = require('./routes/comments')
const indexRouter = require('./routes/index')
const errorHandler = require('./middleware/error-handler')
const sessionMiddleware = require('./middleware/session')
require('./mongo-connection')

const app = express()
app.use(bodyParser.json())
app.use(sessionMiddleware)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/videos', videosRouter)
app.use('/comments', commentsRouter)
app.use('/', indexRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server is listening port 3000')
})
