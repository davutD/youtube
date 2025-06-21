const { userService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await userService.load()
  res.send(users)
})

router.get('/:userId', async (req, res) => {
  const user = await userService.find(req.params.userId)
  if (!user) res.status(404).send('Cannot find the user!!')
  res.send(user)
})

router.post('/', async (req, res) => {
  const newUser = await userService.insert(req.body)
  res.status(201).send(newUser)
})

router.post('/:userId/videos', async (req, res) => {
  const userId = req.params.userId
  const video = await userService.createVideo(userId, req.body)
  res.status(201).send(video)
})

router.patch('/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await userService.update(userId, req.body)
  res.send(user)
})

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params
  await userService.removeBy('_id', userId)
  res.send(`User with id of ${userId} is successfully deleted.`)
})

router.post('/:userId/subscribe', async (req, res) => {
  const userId = req.params.userId
  const subscribeId = req.body.subscribeId
  const userToSubscribe = await userService.subscribe(userId, subscribeId)
  res.send(userToSubscribe)
})

module.exports = router
