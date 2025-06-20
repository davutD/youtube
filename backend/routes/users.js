const { userService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await userService.load()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const user = await userService.find(req.params.id)
  if (!user) res.status(404).send('Cannot find the user!!')
  res.send(user)
})

router.post('/', async (req, res) => {
  const newUser = await userService.insert(req.body)
  res.status(201).send(newUser)
})

router.post('/:id/videos', async (req, res) => {
  const { id } = req.params
  const user = await userService.find(id)
  const video = await userService.createVideo(user, req.body)
  res.status(201).send(video)
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const user = await userService.update(id, req.body)
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await userService.removeBy('_id', id)
  res.send(`User with id of ${id} is successfully deleted.`)
})

module.exports = router
