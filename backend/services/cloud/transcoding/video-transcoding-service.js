const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

class VideoTranscodingService {
  /**
   * Tells Cloudinary to fetch a video from S3 and start transcoding.
   * @param {string} videoId - The ID of our video record.
   * @param {string} storageKey - The key of the raw file in the S3 uploads bucket.
   */
  async startProcessing(videoId, storageKey) {
    const s3SourceUrl = `s3://${process.env.AWS_S3_BUCKET_NAME}/${storageKey}`
    const notificationUrl = `${process.env.API_BASE_URL}/webhooks/video-processed`

    try {
      await cloudinary.uploader.upload(s3SourceUrl, {
        resource_type: 'video',
        public_id: videoId,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        eager_async: true,
        eager_notification_url: notificationUrl,
      })
      console.log(
        `Successfully started Cloudinary processing for video: ${videoId}`
      )
    } catch (err) {
      console.error('Error starting Cloudinary processing:', err)
      // You could update the video status to FAILED here
    }
  }
}

module.exports = new VideoTranscodingService()
