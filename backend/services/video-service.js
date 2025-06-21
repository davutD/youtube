const BaseService = require('./base-service')
const Video = require('../models/video')

class VideoService extends BaseService {
  async findByTitle(title) {
    return this.findBy('title', title)
  }
  async findAllByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }

  async findVideoByUserId(userId, videoId) {
    return this.model.findOne({ _id: videoId, creator: userId })
  }

  async deleteVideo(videoId) {
    return this.removeBy('_id', videoId)
  }

  async deleteVideosByUserId(userId) {
    return await this.model.deleteMany({ creator: userId })
  }

  async deleteVideoByUserId(userId, videoId) {
    return await this.model.findOneAndDelete({ _id: videoId, creator: userId })
  }
}

module.exports = new VideoService(Video)
