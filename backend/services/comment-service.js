const BaseService = require('./base-service')
const Comment = require('../models/comment')

class CommentService extends BaseService {
  async findAllByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }
  async deleteCommentsByUserId(userId) {
    return this.model.deleteMany({ creator: userId })
  }
}

module.exports = new CommentService(Comment)
