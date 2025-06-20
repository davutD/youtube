const BaseDatabase = require('./base-database')
const videoDatabase = require('./video-database')
const User = require('../models/user')

class UserDatabase extends BaseDatabase {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async createVideo(user, videoDetails) {
    const video = await videoDatabase.insert({
      creator: user._id,
      ...videoDetails,
    })
    user.videos.push(video)
    await user.save()
    return video
  }
}

module.exports = new UserDatabase(User)
