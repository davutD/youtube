const BaseService = require('./base-service')
const Comment = require('../models/comment')

class CommentService extends BaseService {
  async findByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }
}

module.exports = new CommentService(Comment)
