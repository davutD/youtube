const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
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
    this.bucketName = process.env.AWS_S3_BUCKET_NAME
  }

  async generateUploadUrl(key, expiresIn = 900) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })
    return getSignedUrl(this.s3, command, { expiresIn })
  }
}

module.exports = AWSS3Service
