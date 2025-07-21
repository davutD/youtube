const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
require('dotenv').config()

class CloudflareR2Service {
  constructor() {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    })
    this.bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME
  }

  /**
   * Generates a pre-signed URL for uploading an object.
   * @param {string} key - The desired key (path/filename) for the object in the bucket.
   * @param {number} expiresIn - The URL's validity duration in seconds.
   * @returns {Promise<string>} The pre-signed URL.
   */

  async generateUploadUrl(key, expiresIn = 900) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    return getSignedUrl(this.s3, command, { expiresIn })
  }
}

module.exports = CloudflareR2Service
