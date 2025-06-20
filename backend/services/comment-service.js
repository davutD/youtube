const BaseService = require('./base-service')
const Comment = require('../models/comment')

class CommentService extends BaseService {}

module.exports = new CommentService(Comment)
