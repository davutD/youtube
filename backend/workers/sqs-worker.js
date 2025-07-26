require('dotenv').config()
require('../mongo-connection')

const {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require('@aws-sdk/client-sqs')
const { videoService } = require('../services')
require('dotenv').config()

const sqsClient = new SQSClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const queueUrl = process.env.AWS_SQS_QUEUE_URL

async function pollSqsForMessages() {
  try {
    const data = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
      })
    )

    if (data.Messages && data.Messages.length > 0) {
      for (const message of data.Messages) {
        const notification = JSON.parse(JSON.parse(message.Body).Message)
        const { uploadId, status, playbackUrl, thumbnailUrl } = notification
        if (!uploadId) {
          console.error('Received message without an uploadId, skipping.')
          continue
        }

        const videosFound = await videoService.findBy('uploadId', uploadId)
        const videoToUpdate = videosFound[0]
        if (videoToUpdate) {
          await videoService.finalizeVideoProcessing(videoToUpdate._id, {
            status,
            playbackUrl,
            thumbnailUrl,
          })
        } else {
          console.error(
            `Video with uploadId ${uploadId} not found in the database.`
          )
        }

        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle,
          })
        )
      }
    }
  } catch (err) {
    console.error('Error polling SQS:', err)
  }

  pollSqsForMessages()
}

console.log('SQS worker started and is now polling for messages...')
pollSqsForMessages()
