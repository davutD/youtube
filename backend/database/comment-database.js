const BaseDatabase = require('./base-database')
const Comment = require('../models/comment')

class CommentDatabase extends BaseDatabase {}

module.exports = new CommentDatabase(Comment)
