const BaseService = require('./base-service')
const Comment = require('../models/comment')

class CommentService extends BaseService {
  async findAllByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }
  async deleteCommentsByUserId(userId) {
    return this.model.deleteMany({ creator: userId })
  }
  async deleteCommentsByVideoId(videoId) {
    return this.model.deleteMany({ video: videoId })
  }
}

module.exports = new CommentService(Comment)
