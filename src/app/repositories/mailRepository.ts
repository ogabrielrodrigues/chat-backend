abstract class MailRepository {
  abstract activate(email: string, activateURL: string): Promise<void>
}
