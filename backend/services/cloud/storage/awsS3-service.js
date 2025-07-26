const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
require('dotenv').config()

class AWSS3Service {
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
    this.bucketName = process.env.AWS_S3_RAW_BUCKET_NAME
  }

  async generateUploadUrl(key, expiresIn = 900) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })
    return getSignedUrl(this.s3, command, { expiresIn })
  }

  async generateDownloadUrl(key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })
    return getSignedUrl(this.s3, command, { expiresIn })
  }

  /**
   * Deletes multiple objects from a specified S3 bucket.
   * @param {string} bucket - The name of the bucket to delete from.
   * @param {string[]} keys - An array of object keys to delete.
   */
  async deleteObjects(bucket, keys) {
    if (!keys || keys.length === 0) {
      return
    }

    const command = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    })

    try {
      await this.s3.send(command)
      console.log(
        `Successfully deleted ${keys.length} objects from bucket: ${bucket}`
      )
    } catch (err) {
      console.error(`Error deleting objects from S3 bucket ${bucket}:`, err)
    }
  }
}

module.exports = AWSS3Service
