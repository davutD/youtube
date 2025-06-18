const flatted = require('flatted')
const { userDatabase } = require('../database')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await userDatabase.load()
  res.send(flatted.stringify(users))
})

router.get('/:id', async (req, res) => {
  const user = await userDatabase.find(req.params.id)
  if (!user) res.status(404).send('Cannot find the user!!')
  res.send(flatted.stringify(user))
})

router.post('/', async (req, res) => {
  const newUser = await userDatabase.insert(req.body)
  res.status(201).send(newUser)
})

router.post('/:id/videos', async (req, res) => {
  const user = await userDatabase.find(req.params.id)
  user.createVideo(req.body)
  await userDatabase.update(user)
  res.status(201).send(flatted.stringify(user))
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params.id
  await userDatabase.removeBy('id', id)
  res.send(`User with id of ${id} is successfully deleted.`)
})

module.exports = router
