export abstract class MailRepository {
  abstract generateConfirmationUrl(userId: string): Promise<{ confirmationUrl: string }>
  abstract confirmation(email: string, confirmationUrl: string): Promise<void>
}
