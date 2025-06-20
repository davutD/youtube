const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: { maxDepth: 1 },
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxLength: [5000, 'Content cannot exceed 5000 characters'],
    },
    likeCount: Number,
  },
  {
    timestamps: true,
  }
)

CommentSchema.plugin(autopopulate)

module.exports = mongoose.model('Comment', CommentSchema)
