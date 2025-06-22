const mongoose = require('mongoose')
const BaseService = require('./base-service')
const videoService = require('./video-service')
const commentService = require('./comment-service')
const User = require('../models/user')

class UserService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async createVideo(userId, videoDetails) {
    const user = await this.find(userId)
    const video = await videoService.insert({
      creator: user._id,
      ...videoDetails,
    })
    await video.save()
    return video
  }

  async deleteVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
    await videoService.deleteVideoByUserId(user._id, video._id)
    return true
  }

  async subscribe(userId, subscribeId) {
    if (userId === subscribeId) {
      throw new Error('You cannot subscribe to yourself')
    }
    const user = await this.find(userId)
    const userToSubscribe = await this.find(subscribeId)
    userToSubscribe.subscribers.addToSet(user._id)
    await user.save()
    await userToSubscribe.save()
    return userToSubscribe
  }

  async unsubscribe(userId, subscribeId) {
    const user = await this.find(userId)
    const userToUnsubscribe = await this.find(subscribeId)
    userToUnsubscribe.subscribers.pull(user._id)
    await user.save()
    await userToUnsubscribe.save()
    return true
  }

  async deleteUser(userId) {
    const user = await this.find(userId)
    await this.model.updateMany(
      { subscribers: user._id },
      { $pull: { subscribers: user._id } }
    )
    await videoService.deleteVideosByUserId(user._id)
    await commentService.deleteCommentsByUserId(user._id)
    await this.removeBy('_id', user._id)
    return true
  }

  // async likeVideo(userId, videoId) {
  //   const user = await this.find(userId)
  //   const video = await videoService.find(videoId)
  //   const uid = user._id
  //   if (video.likedUsers.some((id) => id.equals(uid))) {
  //     video.likedUsers.pull(uid)
  //     video.likeCount = Math.max(0, (video.likeCount || 0) - 1)
  //   } else {
  //     video.likedUsers.addToSet(uid)
  //     video.likeCount = (video.likeCount || 0) + 1
  //     if (video.dislikedUsers.some((id) => id.equals(uid))) {
  //       video.dislikedUsers.pull(uid)
  //       video.dislikeCount = Math.max(0, (video.dislikeCount || 0) - 1)
  //     }
  //   }
  //   await video.save()
  //   return video
  // }

  async likeVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
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

  // async dislikeVideo(userId, videoId) {
  //   const user = await this.find(userId)
  //   const video = await videoService.find(videoId)
  //   const uid = user._id
  //   if (video.dislikedUsers.some((id) => id.equals(uid))) {
  //     video.dislikedUsers.pull(uid)
  //     video.dislikeCount = Math.max(0, (video.dislikeCount || 0) - 1)
  //   } else {
  //     video.dislikedUsers.addToSet(uid)
  //     video.dislikeCount = (video.dislikeCount || 0) + 1
  //     if (video.likedUsers.some((id) => id.equals(uid))) {
  //       video.likedUsers.pull(uid)
  //       video.likeCount = Math.max(0, (video.likeCount || 0) - 1)
  //     }
  //   }
  //   await video.save()
  //   return video
  // }

  async dislikeVideo(userId, videoId) {
    const user = await this.find(userId)
    const video = await videoService.find(videoId)
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
    const video = await videoService.find(videoId)
    const comment = await commentService.insert({
      creator: user._id,
      video: video._id,
      ...content,
    })
    video.comments.addToSet(comment._id)
    await video.save()
    return comment
  }

  async deleteComment(userId, videoId, commentId) {
    const user = await this.find(userId)
    const video = await videoService.findVideoByUserId(user._id, videoId)
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
    const video = await videoService.find(videoId)
    const comment = await commentService.findCommentByVideo(
      video._id,
      commentId
    )
    const newComment = await commentService.insert({
      creator: user._id,
      video: video._id,
      parentComment: comment._id,
      ...content,
    })
    comment.comments.addToSet(newComment._id)
    video.comments.addToSet(newComment._id)
    await video.save()
    await comment.save()
    return newComment
  }

  // async likeComment(userId, commentId) {
  //   const user = await this.find(userId)
  //   const comment = await commentService.find(commentId)
  //   const uid = user._id
  //   if (comment.likedUsers.some((id) => id.equals(uid))) {
  //     comment.likedUsers.pull(uid)
  //     comment.likeCount = Math.max(0, (comment.likeCount || 0) - 1)
  //   } else {
  //     comment.likedUsers.addToSet(uid)
  //     comment.likeCount = (comment.likeCount || 0) + 1
  //     if (comment.dislikedUsers.some((id) => id.equals(uid))) {
  //       comment.dislikedUsers.pull(uid)
  //       comment.dislikeCount = Math.max(0, (comment.dislikeCount || 0) - 1)
  //     }
  //   }
  //   await comment.save()
  //   return comment
  // }

  async likeComment(userId, commentId) {
    const user = await this.find(userId)
    const comment = await commentService.find(commentId)
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

  // async dislikeComment(userId, commentId) {
  //   const user = await this.find(userId)
  //   const comment = await commentService.find(commentId)
  //   const uid = user._id
  //   if (comment.dislikedUsers.some((id) => id.equals(uid))) {
  //     comment.dislikedUsers.pull(uid)
  //     comment.dislikeCount = Math.max(0, (comment.dislikeCount || 0) - 1)
  //   } else {
  //     comment.dislikedUsers.addToSet(uid)
  //     comment.dislikeCount = (comment.dislikeCount || 0) + 1
  //     if (comment.likedUsers.some((id) => id.equals(uid))) {
  //       comment.likedUsers.pull(uid)
  //       comment.likeCount = Math.max(0, (comment.likeCount || 0) - 1)
  //     }
  //   }
  //   await comment.save()
  //   return comment
  // }

  async dislikeComment(userId, commentId) {
    const user = await this.find(userId)
    const comment = await commentService.find(commentId)
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
