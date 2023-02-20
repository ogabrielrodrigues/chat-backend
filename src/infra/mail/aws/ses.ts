import SES from 'aws-sdk/clients/ses'

const SESClient = new SES({
  endpoint: 'email-smtp.us-east-1.amazonaws.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

export { SESClient }
