const BaseService = require('./base-service')
const videoService = require('./video-service')
const User = require('../models/user')

class UserService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async createVideo(user, videoDetails) {
    const video = await videoService.insert({
      creator: user._id,
      ...videoDetails,
    })
    user.videos.push(video)
    await user.save()
    return video
  }
}

module.exports = new UserService(User)
