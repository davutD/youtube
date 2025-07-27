const BaseService = require('./base-service')
const commentService = require('./comment-service')
const Video = require('../../models/video')
const cloudStorageService = require('../cloud/storage/index')

class VideoService extends BaseService {
  async load() {
    return this.model.find().populate('creator', 'name surname')
  }

  async findByTitle(title) {
    return this.findBy('title', title)
  }

  async findAllByCreatorId(creatorId) {
    return this.findBy('creator', creatorId)
  }

  async findVideoByUserId(userId, videoId) {
    return this.model.findOne({ _id: videoId, creator: userId })
  }

  async findCommentsByVideo(videoId) {
    const video = await this.find(videoId)
    if (!video) {
      return []
    }
    return video.comments
  }

  async deleteVideo(videoId) {
    return this.removeBy('_id', videoId)
  }

  async deleteVideosByUserId(userId) {
    const videos = await this.model.find({ creator: userId })
    if (!videos || videos.length === 0) {
      console.log(`No videos found for user ${userId} to delete.`)
      return
    }

    const rawKeys = []
    const transcodedKeys = []
    for (const video of videos) {
      rawKeys.push(video.storageObjectKey)
      transcodedKeys.push(
        `thumbnails/${video.uploadId}.jpg`,
        `videos/${video.uploadId}/1080p.mp4`,
        `videos/${video.uploadId}/720p.mp4`,
        `videos/${video.uploadId}/360p.mp4`
      )
    }
    await cloudStorageService.deleteObjects(
      process.env.AWS_S3_RAW_BUCKET_NAME,
      rawKeys
    )
    await cloudStorageService.deleteObjects(
      process.env.AWS_S3_TRANSCODED_BUCKET_NAME,
      transcodedKeys
    )
    return this.model.deleteMany({ creator: userId })
  }

  async deleteVideoByUserId(userId, videoId) {
    const video = await this.model.findOne({ _id: videoId, creator: userId })
    if (!video) {
      throw new Error(
        'Video not found or you do not have permission to delete it.'
      )
    }
    const { uploadId } = video
    const transcodedKeys = [
      `thumbnails/${uploadId}.jpg`,
      `videos/${uploadId}/1080p.mp4`,
      `videos/${uploadId}/720p.mp4`,
      `videos/${uploadId}/360p.mp4`,
    ]
    const rawKey = video.storageObjectKey
    await cloudStorageService.deleteObjects(
      process.env.AWS_S3_TRANSCODED_BUCKET_NAME,
      transcodedKeys
    )

    await cloudStorageService.deleteObjects(
      process.env.AWS_S3_RAW_BUCKET_NAME,
      [rawKey]
    )

    await commentService.deleteCommentsByVideoId(videoId)
    return this.model.findByIdAndDelete(videoId)
  }

  async finalizeVideoProcessing(videoId, processingResult) {
    const { status, playbackUrl, thumbnailUrl } = processingResult
    const updatedVideoData = {
      status: status === 'COMPLETED' ? 'READY' : 'FAILED',
      playbackUrl,
      thumbnailUrl,
    }
    return this.update(videoId, updatedVideoData)
  }
}

module.exports = new VideoService(Video)
