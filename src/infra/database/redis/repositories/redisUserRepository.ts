import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'
import { Redis } from 'ioredis'

export class RedisUserRepository implements UserRepository {
  constructor(private redis: Redis, private userRepository: UserRepository) {}

  async create(user: User): Promise<void> {}

  async getUsers(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users-cache')

    if (!cachedUsers) {
      const users = await this.userRepository.getUsers()

      const preCacheUsers = users.map(PrismaUserMapper.toPrisma)

      await this.redis.set('users-cache', JSON.stringify(preCacheUsers), 'EX', 15)

      return users.map(PrismaUserMapper.toDomain)
    }

    return JSON.parse(cachedUsers)
  }

  async countUsers(): Promise<number> {
    return 0
  }
}
