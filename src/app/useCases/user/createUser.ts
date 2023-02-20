import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface CreateUserRequest {
  username: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { username, email, password } = request

    const user = new User({
      username,
      email,
      password
    })

    await this.userRepository.create(user)

    return {
      user
    }
  }
}
