const express = require('express')
const bodyParser = require('body-parser')
const flatted = require('flatted')
const { userDatabase } = require('./database')
const User = require('./models/user')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const users = await userDatabase.load()
  res.send(flatted.stringify(users))
})

app.get('/users/:id', async (req, res) => {
  const user = await userDatabase.find(req.params.id)
  if (!user) res.status(404).send('Cannot find the user!!')
  res.send(flatted.stringify(user))
})

app.post('/users', async (req, res) => {
  const newUser = User.create(req.body)
  await userDatabase.insert(newUser)
  res.status(201).send(newUser)
})

app.listen(3000, () => {
  console.log('Server is listening port 3000')
})
