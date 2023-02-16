import { User } from '@entities/user'
import { UpdateUser } from './updateUser'

interface EmailConfirmationRequest {
  user: User
}

export class EmailConfirmation {
  constructor(private updateUser: UpdateUser) {}

  async execute({ user }: EmailConfirmationRequest) {
    await this.updateUser.execute({ id: user.id, user })
  }
}
