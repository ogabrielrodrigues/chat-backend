import { Transporter } from 'nodemailer'

export class MailTrapRepository implements MailRepository {
  constructor(private mailtrap: Transporter) {}

  async activate(email: string, activateURL: string): Promise<void> {
    await this.mailtrap.sendMail({
      from: 'Simple Web Chat <gabrielrodrigues409@outlook.com>',
      to: email,
      subject: 'User confirmation',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <title>User Activated Successful!</title>
      </head>
      <body>
        <h1>Activate your account!</h1>
        <p>To activate your account:</p>
        <a href="${activateURL}">${activateURL}</a>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            background-color: #1a1924;
            gap: 10px;
          }

          body * {
            font-family: 'Roboto', sans-serif;
            color: #e1e1e6;
          }

          a {
            color: #00b37e;
          }
        </style>
      </body>
      </html>
      `
    })
  }
}
