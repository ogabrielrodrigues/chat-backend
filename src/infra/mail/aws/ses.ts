import SES from 'aws-sdk/clients/ses'

const SESClient = new SES({
  endpoint: 'email-smtp.us-east-1.amazonaws.com',
  region: 'us-east-1'
})

export { SESClient }
