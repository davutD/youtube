const { userService } = require('../services')
const authHandler = require('../middleware/auth-handler')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.load()
    res.send(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await userService.find(req.params.userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// router.post('/:userId/videos', authHandler, async (req, res, next) => {
//   try {
//     const userId = req.params.userId
//     const video = await userService.uploadVideo(userId, req.body)
//     res.status(201).send(video)
//   } catch (err) {
//     next(err)
//   }
// })

router.post(
  '/:userId/videos/initiate-upload',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId } = req.params
      const { filename } = req.body
      const result = await userService.initiateVideoUpload(userId, filename)
      res.send(result)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/:userId/videos/finalize-upload',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId } = req.params
      const video = await userService.finalizeVideoUpload(userId, req.body)
      res.status(201).send(video)
    } catch (err) {
      next(err)
    }
  }
)

router.patch('/:userId', authHandler, async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await userService.update(userId, req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', authHandler, async (req, res, next) => {
  try {
    const { userId } = req.params
    await userService.deleteUser(userId)
    res.send(`User with id of ${userId} is successfully deleted.`)
  } catch (err) {
    next(err)
  }
})

router.post(
  '/:userId/subscribers/:subscribeId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, subscribeId } = req.params
      const userToSubscribe = await userService.subscribe(userId, subscribeId)
      res.send(userToSubscribe)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/subscribers/:subscribeId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, subscribeId } = req.params
      await userService.unsubscribe(userId, subscribeId)
      res.send(`User with id of ${subscribeId} is successfully unsubscribed.`)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/:userId/likesVideo/:videoId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId } = req.params
      const video = await userService.likeVideo(userId, videoId)
      res.send(video)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/likesVideo/:videoId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId } = req.params
      const video = await userService.dislikeVideo(userId, videoId)
      res.send(video)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/videos/:videoId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId } = req.params
      await userService.deleteVideo(userId, videoId)
      res.send(`Video with ${videoId} id deleted`)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/:userId/video/:videoId/comments',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId } = req.params
      const comment = await userService.makeComment(userId, videoId, req.body)
      res.status(201).send(comment)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/video/:videoId/comments/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId, commentId } = req.params
      await userService.deleteComment(userId, videoId, commentId)
      res.send(`Comment with ${commentId} id deleted`)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/:userId/video/:videoId/comments/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, videoId, commentId } = req.params
      const comment = await userService.replyComment(
        userId,
        videoId,
        commentId,
        req.body
      )
      res.status(201).send(comment)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/:userId/likesComment/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, commentId } = req.params
      const comment = await userService.likeComment(userId, commentId)
      res.send(comment)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/likesComment/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { userId, commentId } = req.params
      const comment = await userService.dislikeComment(userId, commentId)
      res.send(comment)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
