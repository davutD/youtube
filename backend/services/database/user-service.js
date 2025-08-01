const mongoose = require('mongoose')
const BaseService = require('./base-service')
const videoService = require('./video-service')
const commentService = require('./comment-service')
const cloudStorageService = require('../cloud/storage/index')
const User = require('../../models/user')
const { v4: uuidv4 } = require('uuid')

class UserService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async initiateVideoUpload(userId, filename) {
    if (!filename) {
      throw new Error('Filename is required.')
    }
    const key = `videos/${userId}/${uuidv4()}-${filename}`
    const uploadUrl = await cloudStorageService.generateUploadUrl(key)
    return {
      uploadUrl,
      key,
    }
  }

  async finalizeVideoUpload(userId, videoDetails) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const uploadId = videoDetails.key.split('/')[2].split('-')[0]
    const videoData = {
      creator: user._id,
      title: videoDetails.title,
      description: videoDetails.description,
      storageObjectKey: videoDetails.key,
      uploadId: uploadId,
      status: 'PROCESSING',
    }
    const video = await videoService.insert(videoData)
    if (!video) {
      throw new Error('Video record could not be created.')
    }
    return video
  }

  async deleteVideo(userId, videoId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const video = await videoService.find(videoId)
    if (!video) {
      throw new Error('Video could not be found.')
    }
    await videoService.deleteVideoByUserId(user._id, video._id)
    return true
  }

  async subscribe(userId, subscribeId) {
    if (userId === subscribeId) {
      throw new Error('You cannot subscribe to yourself')
    }
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const userToSubscribe = await this.find(subscribeId)
    if (!userToSubscribe) {
      throw new Error(
        'The user you are trying to subscribe to could not be found.'
      )
    }
    userToSubscribe.subscribers.addToSet(user._id)
    await user.save()
    await userToSubscribe.save()
    return userToSubscribe
  }

  async unsubscribe(userId, subscribeId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const userToUnsubscribe = await this.find(subscribeId)
    if (!userToUnsubscribe) {
      throw new Error(
        'The user you are trying to unsubscribe from could not be found.'
      )
    }
    userToUnsubscribe.subscribers.pull(user._id)
    await user.save()
    await userToUnsubscribe.save()
    return true
  }

  async deleteUser(userId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    await mongoose.connection.db.collection('sessions').deleteOne({
      session: new RegExp(`"_id":"${userId}"`),
    })
    await this.model.updateMany(
      { subscribers: user._id },
      { $pull: { subscribers: user._id } }
    )
    await videoService.deleteVideosByUserId(user._id)
    await commentService.deleteCommentsByUserId(user._id)
    await this.removeBy('_id', user._id)
    return true
  }

  async likeVideo(userId, videoId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const video = await videoService.find(videoId)
    if (!video) {
      throw new Error('Video could not be found.')
    }
    const uid = user._id
    const vid = video._id
    const hasLiked = await videoService.model.exists({
      _id: vid,
      likedUsers: uid,
    })
    if (hasLiked) {
      return videoService.model.findByIdAndUpdate(
        vid,
        {
          $pull: { likedUsers: uid },
          $inc: { likeCount: -1 },
        },
        { new: true }
      )
    }
    const hasDisliked = await videoService.model.exists({
      _id: vid,
      dislikedUsers: uid,
    })
    const updateOps = {
      $addToSet: { likedUsers: uid },
      $inc: { likeCount: 1 },
    }
    if (hasDisliked) {
      updateOps.$pull = { dislikedUsers: uid }
      updateOps.$inc.dislikeCount = -1
    }
    return videoService.model.findByIdAndUpdate(vid, updateOps, {
      new: true,
    })
  }

  async dislikeVideo(userId, videoId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const video = await videoService.find(videoId)
    if (!video) {
      throw new Error('Video could not be found.')
    }
    const uid = user._id
    const vid = video._id
    const hasDisliked = await videoService.model.exists({
      _id: vid,
      dislikedUsers: uid,
    })
    if (hasDisliked) {
      return videoService.model.findByIdAndUpdate(
        vid,
        {
          $pull: { dislikedUsers: uid },
          $inc: { dislikeCount: -1 },
        },
        { new: true }
      )
    }
    const hasLiked = await videoService.model.exists({
      _id: vid,
      likedUsers: uid,
    })
    const updateOps = {
      $addToSet: { dislikedUsers: uid },
      $inc: { dislikeCount: 1 },
    }
    if (hasLiked) {
      updateOps.$pull = { likedUsers: uid }
      updateOps.$inc.likeCount = -1
    }
    return videoService.model.findByIdAndUpdate(vid, updateOps, { new: true })
  }

  async makeComment(userId, videoId, content) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const videoExists = await videoService.find(videoId)
    if (!videoExists) {
      throw new Error('Video could not be found.')
    }
    const comment = await commentService.insert({
      creator: user._id,
      video: videoId,
      ...content,
    })
    if (!comment) {
      throw new Error('Comment could not be created.')
    }
    await videoService.update(videoId, {
      $addToSet: { comments: comment._id },
      $inc: { totalCommentCount: 1 },
    })

    return comment
  }

  async deleteComment(userId, videoId, commentId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const video = await videoService.findVideoByUserId(user._id, videoId)
    if (!video) {
      throw new Error(
        'Video could not be found or does not belong to this user.'
      )
    }
    const commentExistsOnVideo = video.comments.some((comment) =>
      comment._id.equals(commentId)
    )
    if (!commentExistsOnVideo) {
      throw new Error('Comment could not be found on this video.')
    }
    await this._recursivelyDeleteComments(commentId, video)
    await video.save()
    return true
  }

  async replyComment(userId, videoId, commentId, content) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const videoExists = await videoService.find(videoId)
    if (!videoExists) {
      throw new Error('Video could not be found.')
    }
    const parentComment = await commentService.find(commentId)
    if (!parentComment) {
      throw new Error(
        'The comment you are trying to reply to could not be found.'
      )
    }

    const newComment = await commentService.insert({
      creator: user._id,
      video: videoId,
      parentComment: parentComment._id,
      ...content,
    })
    if (!newComment) {
      throw new Error('Your reply could not be created.')
    }

    parentComment.comments.addToSet(newComment._id)
    await parentComment.save()
    await videoService.update(videoId, {
      $addToSet: { comments: newComment._id },
      $inc: { totalCommentCount: 1 },
    })

    return newComment
  }

  async likeComment(userId, commentId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const comment = await commentService.find(commentId)
    if (!comment) {
      throw new Error('Comment could not be found.')
    }
    const uid = user._id
    const cid = comment._id
    const hasLiked = await commentService.model.exists({
      _id: cid,
      likedUsers: uid,
    })
    if (hasLiked) {
      return commentService.model.findByIdAndUpdate(
        cid,
        { $pull: { likedUsers: uid }, $inc: { likeCount: -1 } },
        { new: true }
      )
    }
    const hasDisliked = await commentService.model.exists({
      _id: cid,
      dislikedUsers: uid,
    })
    const updateOps = { $addToSet: { likedUsers: uid }, $inc: { likeCount: 1 } }
    if (hasDisliked) {
      updateOps.$pull = { dislikedUsers: uid }
      updateOps.$inc.dislikeCount = -1
    }
    return commentService.model.findByIdAndUpdate(cid, updateOps, {
      new: true,
    })
  }

  async dislikeComment(userId, commentId) {
    const user = await this.find(userId)
    if (!user) {
      throw new Error('User could not be found.')
    }
    const comment = await commentService.find(commentId)
    if (!comment) {
      throw new Error('Comment could not be found.')
    }
    const uid = user._id
    const cid = comment._id
    const hasDisliked = await commentService.model.exists({
      _id: cid,
      dislikedUsers: uid,
    })

    if (hasDisliked) {
      return commentService.model.findByIdAndUpdate(
        cid,
        {
          $pull: { dislikedUsers: uid },
          $inc: { dislikeCount: -1 },
        },
        { new: true }
      )
    }
    const hasLiked = await commentService.model.exists({
      _id: cid,
      likedUsers: uid,
    })

    const updateOps = {
      $addToSet: { dislikedUsers: uid },
      $inc: { dislikeCount: 1 },
    }
    if (hasLiked) {
      updateOps.$pull = { likedUsers: uid }
      updateOps.$inc.likeCount = -1
    }
    return commentService.model.findByIdAndUpdate(cid, updateOps, { new: true })
  }

  async _recursivelyDeleteComments(commentId, video) {
    const comment = await commentService.find(commentId)
    if (!comment) {
      return
    }
    if (comment.comments && comment.comments.length > 0) {
      await Promise.all(
        comment.comments.map((childId) =>
          this._recursivelyDeleteComments(childId, video)
        )
      )
    }
    video.comments.pull(commentId)
    if (comment.parentComment) {
      await commentService.update(
        { _id: comment.parentComment },
        { $pull: { comments: commentId } }
      )
    }
    await commentService.removeBy('_id', commentId)
  }
}

module.exports = new UserService(User)
