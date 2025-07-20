const CloudflareR2Service = require('./cloudflareR2-service')

function createCloudStorageService() {
  const provider = process.env.CLOUD_STORAGE_PROVIDER

  switch (provider) {
    case 'CLOUDFLARE_R2':
      console.log('Using Cloudflare R2 for storage.')
      return new CloudflareR2Service()
    default:
      throw new Error(`Unsupported cloud storage provider: ${provider}`)
  }
}

module.exports = createCloudStorageService()
