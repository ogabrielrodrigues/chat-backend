import { User } from '@entities/user'

interface GenerateConfirmationURLRequest {
  user: User
}

interface GenerateConfirmationURLResponse {
  confirmationURL: string
}

export class GenerateConfirmationURL {
  execute({ user }: GenerateConfirmationURLRequest): GenerateConfirmationURLResponse {
    const url = `${process.env.BASE_URL}/activate?id=${user.id}`

    return { confirmationURL: url }
  }
}
