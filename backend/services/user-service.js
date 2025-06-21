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

  async subscribe(userId, subscribeId) {
    const user = await this.find(userId)
    const userToSubscribe = await this.find(subscribeId)
    userToSubscribe.subscribers.push(user._id)
    user.save()
    userToSubscribe.save()
    return userToSubscribe
  }
}

module.exports = new UserService(User)
