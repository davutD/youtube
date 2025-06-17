const BaseDatabase = require('./base-database')
const Video = require('../models/video')

class VideoDatabase extends BaseDatabase {
  async findByTitle(title) {
    const objects = await this.load()
    return objects.find((object) => object.title === title)
  }
}

module.exports = new VideoDatabase(Video)
