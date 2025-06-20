const BaseDatabase = require('./base-database')
const Video = require('../models/video')

class VideoDatabase extends BaseDatabase {
  async findByTitle(title) {
    return this.findBy('title', title)
  }
  async findByCreatorId(creatorId) {
    return this.findBy('user', creatorId)
  }
}

module.exports = new VideoDatabase(Video)
