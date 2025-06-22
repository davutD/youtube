const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: false,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
      autopopulate: false,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: false,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxLength: [5000, 'Content cannot exceed 5000 characters'],
    },
    likeCount: Number,
    dislikeCount: Number,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: false,
      },
    ],
    likedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: false,
      },
    ],
    dislikedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: false,
      },
    ],
  },
  {
    timestamps: true,
  }
)

CommentSchema.plugin(autopopulate)

module.exports = mongoose.model('Comment', CommentSchema)
