const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const { Schema } = mongoose

const VideoSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: false,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [2, 'Title must be at least 2 character'],
      maxLength: [200, 'Title cannot exceed 200 character'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [2, 'Description must be at least 2 character'],
      maxLength: [5000, 'Description cannot exceed 5000 character'],
    },
    playbackUrl: {
      type: String,
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    uploadId: {
      type: String,
      required: true,
      unique: true,
    },
    storageObjectKey: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['PROCESSING', 'READY', 'FAILED'],
      default: 'PROCESSING',
    },
    tags: [],
    likeCount: Number,
    dislikeCount: Number,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: false,
      },
    ],
    totalCommentCount: {
      type: Number,
      default: 0,
      min: [0, 'Comment count cannot be negative'],
    },
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

VideoSchema.plugin(autopopulate)

module.exports = mongoose.model('Video', VideoSchema)
