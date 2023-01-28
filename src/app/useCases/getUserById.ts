import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface GetUserByIdRequest {
  id: string
}

interface GetUserByIdResponse {
  user: User
}

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.getUserById(request.id)

    return {
      user: PrismaUserMapper.toDomain(user)
    }
  }
}
