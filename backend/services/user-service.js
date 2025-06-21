const BaseService = require('./base-service')
const videoService = require('./video-service')
const User = require('../models/user')

class UserService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async createVideo(userId, videoDetails) {
    const user = await this.find(userId)
    const video = await videoService.insert({
      creator: user._id,
      ...videoDetails,
    })
    await video.save()
    return video
  }
}

module.exports = new UserService(User)
