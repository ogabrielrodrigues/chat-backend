import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface CreateUserRequest {
  name: string
  username: string
  age: number
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, username, age, email, password } = request

    const user = new User({
      name,
      username,
      age,
      email,
      password
    })

    await this.userRepository.create(user)

    return {
      user
    }
  }
}
