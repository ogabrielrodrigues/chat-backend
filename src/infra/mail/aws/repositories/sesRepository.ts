import SES from 'aws-sdk/clients/ses'

export class SESRepository implements MailRepository {
  constructor(private SESClient: SES) {}

  async activate(email: string, activateURL: string): Promise<void> {
    await this.SESClient.sendEmail({
      Destination: {
        ToAddresses: [email]
      },
      Source: process.env.AWS_SES_SOURCE,
      Message: {
        Subject: {
          Data: 'User confirmation'
        },
        Body: {
          Html: {
            Data: `
              <h1>Activate your account!</h1>
              <a href="${activateURL}"/>
            `
          }
        }
      }
    }).promise()
  }
}
