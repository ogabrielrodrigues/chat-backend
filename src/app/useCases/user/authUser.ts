import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface AuthUserRequest {
  username: string
  password: string
}

interface AuthUserResponse {
  user: User
}

export class AuthUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: AuthUserRequest): Promise<AuthUserResponse> {
    const { username, password } = request

    const user = await this.userRepository.auth(username, password)

    return {
      user
    }
  }
}
