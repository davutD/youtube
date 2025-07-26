const Mux = require('@mux/mux-node')
const cloudStorageService = require('../storage')
require('dotenv').config()

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET)

class VideoTranscodingService {
  async startProcessing(videoId, storageKey) {
    const s3DownloadUrl = await cloudStorageService.generateDownloadUrl(
      storageKey
    )

    try {
      await mux.video.assets.create({
        input: s3DownloadUrl,
        playback_policy: ['public'],
        passthrough: videoId,
      })
      console.log(`Mux processing started for ${videoId}`)
    } catch (err) {
      console.error('Mux start error:', err)
    }
  }
}

module.exports = new VideoTranscodingService()
