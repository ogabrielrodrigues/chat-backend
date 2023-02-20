import { Transporter } from 'nodemailer'

export class MailTrapRepository implements MailRepository {
  constructor(private mailtrap: Transporter) {}

  async activate(email: string, activateURL: string): Promise<void> {
    await this.mailtrap.sendMail({
      from: 'Simple Web Chat <gabrielrodrigues409@outlook.com>',
      to: email,
      subject: 'User confirmation',
      html: `
        <h1>Activate your account!</h1>
        <a href="${activateURL}">${activateURL}</a>
      `
    })
  }
}
