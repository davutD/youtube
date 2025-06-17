const express = require('express')
const flatted = require('flatted')
const { userDatabase } = require('./database')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const users = await userDatabase.load()
  res.send(flatted.stringify(users))
})

app.listen(3000, () => {
  console.log('Server is listening port 3000')
})
