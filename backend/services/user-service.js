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

  async deleteVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
    await videoService.deleteVideoByUserId(user._id, video._id)
    return true
  }

  async subscribe(userId, subscribeId) {
    if (userId === subscribeId) {
      throw new Error('You cannot subscribe to yourself')
    }
    const user = await this.find(userId)
    const userToSubscribe = await this.find(subscribeId)
    userToSubscribe.subscribers.addToSet(user._id)
    await user.save()
    await userToSubscribe.save()
    return userToSubscribe
  }

  async unsubscribe(userId, subscribeId) {
    const user = await this.find(userId)
    const userToUnsubscribe = await this.find(subscribeId)
    userToUnsubscribe.subscribers.pull(user._id)
    await user.save()
    await userToUnsubscribe.save()
    return true
  }

  async deleteUser(userId) {
    const user = await this.find(userId)
    await this.model.updateMany(
      { subscribers: user._id },
      { $pull: { subscribers: user._id } }
    )
    await videoService.deleteVideosByUserId(user._id)
    await this.removeBy('_id', user._id)
    return true
  }

  async likeVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
    if (video.likedUsers.some((id) => id.equals(user._id))) {
      video.likedUsers.pull(user._id)
    } else {
      video.likedUsers.addToSet(user._id)
      video.dislikedUsers.pull(user._id)
    }
    await video.save()
    return video
  }

  async dislikeVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
    if (video.dislikedUsers.some((id) => id.equals(user._id))) {
      video.dislikedUsers.pull(user._id)
    } else {
      video.dislikedUsers.addToSet(user._id)
      video.likedUsers.pull(user._id)
    }
    await video.save()
    return video
  }

  async makeComment(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
    const all = await videoService.findVideoByUserId(user._id, video._id)
    return all
  }
}

module.exports = new UserService(User)
