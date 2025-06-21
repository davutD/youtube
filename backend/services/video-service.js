const BaseService = require('./base-service')
const Video = require('../models/video')

class VideoService extends BaseService {
  async findByTitle(title) {
    return this.findBy('title', title)
  }
  async findByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }
  async deleteVideo(videoId) {
    return this.removeBy('_id', videoId)
  }

  async deleteVideosByUserId(userId) {
    return await Video.deleteMany({ creator: userId })
  }
}

module.exports = new VideoService(Video)
