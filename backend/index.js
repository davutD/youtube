const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users')
const videosRouter = require('./routes/videos')
const commentsRouter = require('./routes/comments')
const indexRouter = require('./routes/index')
const errorHandler = require('./middleware/error-handler')
require('./mongo-connection')

const app = express()
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/videos', videosRouter)
app.use('/comments', commentsRouter)
app.use('/', indexRouter)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is listening port 3000')
})
