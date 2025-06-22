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
  await userService.deleteUser(userId)
  res.send(`User with id of ${userId} is successfully deleted.`)
})

router.post('/:userId/subscribers/:subscribeId', async (req, res) => {
  const { userId, subscribeId } = req.params
  const userToSubscribe = await userService.subscribe(userId, subscribeId)
  res.send(userToSubscribe)
})

router.delete('/:userId/subscribers/:subscribeId', async (req, res) => {
  const { userId, subscribeId } = req.params
  await userService.unsubscribe(userId, subscribeId)
  res.send(`User with id of ${subscribeId} is successfully unsubscribed.`)
})

router.post('/:userId/likesVideo/:videoId', async (req, res) => {
  const { userId, videoId } = req.params
  const video = await userService.likeVideo(userId, videoId)
  res.send(video)
})

router.delete('/:userId/likesVideo/:videoId', async (req, res) => {
  const { userId, videoId } = req.params
  const video = await userService.dislikeVideo(userId, videoId)
  res.send(video)
})

router.delete('/:userId/videos/:videoId', async (req, res) => {
  const { userId, videoId } = req.params
  await userService.deleteVideo(userId, videoId)
  res.send(`Video with ${videoId} id deleted`)
})

router.post('/:userId/video/:videoId/comments', async (req, res) => {
  const { userId, videoId } = req.params
  const comment = await userService.makeComment(userId, videoId, req.body)
  res.status(201).send(comment)
})

router.delete(
  '/:userId/video/:videoId/comments/:commentId',
  async (req, res) => {
    const { userId, videoId, commentId } = req.params
    await userService.deleteComment(userId, videoId, commentId)
    res.send(`Comment with ${commentId} id deleted`)
  }
)

router.post('/:userId/video/:videoId/comments/:commentId', async (req, res) => {
  const { userId, videoId, commentId } = req.params
  const comment = await userService.replyComment(
    userId,
    videoId,
    commentId,
    req.body
  )
  res.status(201).send(comment)
})

router.post('/:userId/likesComment/:commentId', async (req, res, next) => {
  const { userId, commentId } = req.params
  const comment = await userService.likeComment(userId, commentId)
  res.send(comment)
})

router.delete('/:userId/likesComment/:commentId', async (req, res, next) => {
  try {
    const { userId, commentId } = req.params
    const comment = await userService.dislikeComment(userId, commentId)
    res.send(comment)
  } catch (err) {
    next(err)
  }
})

module.exports = router
