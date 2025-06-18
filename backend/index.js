const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users')
const indexRouter = require('./routes/index')

const app = express()
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/', indexRouter)

app.listen(3000, () => {
  console.log('Server is listening port 3000')
})
