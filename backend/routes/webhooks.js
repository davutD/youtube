const router = require('express').Router()
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
        WaitTimeSeconds: 20, // Use long polling
      })
    )

    if (data.Messages && data.Messages.length > 0) {
      for (const message of data.Messages) {
        // The actual notification is nested inside the message body
        const notification = JSON.parse(JSON.parse(message.Body).Message)
        const detail = notification.detail
        const videoId = detail.userMetadata.videoId

        // Logic to construct the final URLs from the job output details
        const outputKey =
          detail.outputGroupDetails[0].outputDetails[0].outputFilePaths[0]
            .split('/')
            .slice(3)
            .join('/')
        const playbackUrl = `${process.env.CDN_URL}/${outputKey}`
        const thumbnailUrl = `${
          process.env.CDN_URL
        }/${detail.outputGroupDetails[1].outputDetails[0].outputFilePaths[0]
          .split('/')
          .slice(3)
          .join('/')}`

        await videoService.finalizeProcessing(videoId, {
          status: detail.status,
          playbackUrl,
          thumbnailUrl,
        })

        // Delete the message from the queue once processed
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
}

// Start polling when the server starts
// In a large-scale app, this would be a separate worker process.
setInterval(pollSqsForMessages, 30000) // Poll every 30 seconds

// You can also add a manual trigger endpoint if needed
router.post('/process-queue', (req, res) => {
  pollSqsForMessages()
  res.status(202).send('Queue processing initiated.')
})

module.exports = router
