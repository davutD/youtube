const {
  MediaConvertClient,
  CreateJobCommand,
} = require('@aws-sdk/client-mediaconvert')
require('dotenv').config()

class VideoTranscodingService {
  constructor() {
    this.mediaConvert = new MediaConvertClient({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  /**
   * Starts a transcoding job in AWS Elemental MediaConvert.
   * @param {string} videoId - The ID of our video record.
   * @param {string} storageKey - The key of the raw file in the uploads S3 bucket.
   */
  async startProcessing(videoId, storageKey) {
    const sourceS3Path = `s3://${process.env.AWS_S3_UPLOADS_BUCKET_NAME}/${storageKey}`

    const params = {
      Role: process.env.AWS_MEDIACONVERT_ROLE_ARN,
      JobTemplate: process.env.AWS_MEDIACONVERT_TEMPLATE_NAME,
      Settings: {
        Inputs: [
          {
            FileInput: sourceS3Path,
          },
        ],
      },
      UserMetadata: {
        videoId: videoId, // Pass our videoId to the job
      },
    }

    try {
      const command = new CreateJobCommand(params)
      await this.mediaConvert.send(command)
      console.log(`Successfully started MediaConvert job for video: ${videoId}`)
    } catch (err) {
      console.error('Error starting MediaConvert job:', err)
      // Here you might want to update the video status to 'FAILED'
    }
  }
}

module.exports = new VideoTranscodingService()
