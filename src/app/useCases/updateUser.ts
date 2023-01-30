import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface UpdateUserRequest {
  id: string
  user: User
}

interface UpdateUserResponse {
  user: User
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { id, user } = request

    await this.userRepository.update(id, user)

    return {
      user
    }
  }
}
