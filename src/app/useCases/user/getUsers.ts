import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

interface GetUsersResponse {
  users: User[]
}

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetUsersResponse> {
    const users = await this.userRepository.get()

    return {
      users: users.map(PrismaUserMapper.toDomain)
    }
  }
}
