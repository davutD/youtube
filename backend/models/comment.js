const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: String,
  likeCount: Number,
})

module.exports = mongoose.model('CommentSchema', CommentSchema)
