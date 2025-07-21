const CloudflareR2Service = require('./cloudflareR2-service')
const AWSS3Service = require('./awsS3-service')

function createCloudStorageService() {
  const provider = process.env.CLOUD_STORAGE_PROVIDER

  switch (provider) {
    case 'CLOUDFLARE_R2':
      console.log('Using Cloudflare R2 for storage.')
      return new CloudflareR2Service()
    case 'AWS_S3':
      console.log('Using AWS S3 for storage.')
      return new AWSS3Service()
    default:
      throw new Error(`Unsupported cloud storage provider: ${provider}`)
  }
}

module.exports = createCloudStorageService()
