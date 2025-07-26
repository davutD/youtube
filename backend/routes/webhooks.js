const router = require('express').Router()
const { videoService } = require('../services')

router.post('/video-processed', async (req, res, next) => {
  try {
    const { type, data } = req.body

    if (type === 'video.asset.ready') {
      const videoId = data.passthrough
      const playbackId = data.playback_ids[0].id
      const playbackUrl = `https://stream.mux.com/${playbackId}.m3u8`
      const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`

      await videoService.finalizeVideoProcessing(videoId, {
        status: 'COMPLETED',
        playbackUrl,
        thumbnailUrl,
      })

      console.log(`Mux webhook processed for video: ${videoId}`)
    }

    res.status(200).send('Notification received.')
  } catch (err) {
    next(err)
  }
})

module.exports = router
