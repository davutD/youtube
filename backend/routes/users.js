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

router.post('/videos/initiate-upload', authHandler, async (req, res, next) => {
  try {
    const { filename } = req.body
    const result = await userService.initiateVideoUpload(req.user._id, filename)
    res.send(result)
  } catch (err) {
    next(err)
  }
})

router.post('/videos/finalize-upload', authHandler, async (req, res, next) => {
  try {
    const video = await userService.finalizeVideoUpload(req.user._id, req.body)
    res.status(201).send(video)
  } catch (err) {
    next(err)
  }
})

router.patch('/me', authHandler, async (req, res, next) => {
  try {
    const user = await userService.update(req.user._id, req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/me', authHandler, async (req, res, next) => {
  try {
    const userId = req.user._id
    await userService.deleteUser(userId)
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session after user deletion:', err)
      }
      res.clearCookie('connect.sid')
      res.send(`User with id of ${userId} is successfully deleted.`)
    })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/subscribers/:subscribeId',
  authHandler,
  async (req, res, next) => {
    try {
      const { subscribeId } = req.params
      const userToSubscribe = await userService.subscribe(
        req.user._id,
        subscribeId
      )
      res.send(userToSubscribe)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/subscribers/:subscribeId',
  authHandler,
  async (req, res, next) => {
    try {
      const { subscribeId } = req.params
      await userService.unsubscribe(req.user._id, subscribeId)
      res.send(`User with id of ${subscribeId} is successfully unsubscribed.`)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/likesVideo/:videoId', authHandler, async (req, res, next) => {
  try {
    const { videoId } = req.params
    const video = await userService.likeVideo(req.user._id, videoId)
    res.send(video)
  } catch (err) {
    next(err)
  }
})

router.delete('/likesVideo/:videoId', authHandler, async (req, res, next) => {
  try {
    const { videoId } = req.params
    const video = await userService.dislikeVideo(req.user._id, videoId)
    res.send(video)
  } catch (err) {
    next(err)
  }
})

router.delete('/videos/:videoId', authHandler, async (req, res, next) => {
  try {
    const { videoId } = req.params
    await userService.deleteVideo(req.user._id, videoId)
    res.send(`Video with ${videoId} id deleted`)
  } catch (err) {
    next(err)
  }
})

router.post('/video/:videoId/comments', authHandler, async (req, res, next) => {
  try {
    const { videoId } = req.params
    const comment = await userService.makeComment(
      req.user._id,
      videoId,
      req.body
    )
    res.status(201).send(comment)
  } catch (err) {
    next(err)
  }
})

router.delete(
  '/video/:videoId/comments/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { videoId, commentId } = req.params
      await userService.deleteComment(req.user._id, videoId, commentId)
      res.send(`Comment with ${commentId} id deleted`)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/video/:videoId/comments/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { videoId, commentId } = req.params
      const comment = await userService.replyComment(
        req.user._id,
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

router.post('/likesComment/:commentId', authHandler, async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await userService.likeComment(req.user._id, commentId)
    res.send(comment)
  } catch (err) {
    next(err)
  }
})

router.delete(
  '/likesComment/:commentId',
  authHandler,
  async (req, res, next) => {
    try {
      const { commentId } = req.params
      const comment = await userService.dislikeComment(req.user._id, commentId)
      res.send(comment)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
