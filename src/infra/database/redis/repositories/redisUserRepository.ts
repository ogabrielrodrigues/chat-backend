import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'
import { Redis } from 'ioredis'

export class RedisUserRepository implements UserRepository {
  constructor(private redis: Redis, private userRepository: UserRepository) {}

  async create(user: User): Promise<void> {
    this.userRepository.create(user)
  }

  async get(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users-cache')

    if (!cachedUsers) {
      const users = await this.userRepository.get()

      const preCacheUsers = users.map(PrismaUserMapper.toPrisma)

      await this.redis.set('users-cache', JSON.stringify(preCacheUsers), 'EX', 15)

      return users.map(PrismaUserMapper.toDomain)
    }

    return JSON.parse(cachedUsers)
  }

  async count(): Promise<number> {
    return this.userRepository.count()
  }

  async getById(id: string): Promise<User> {
    const cachedUser = await this.redis.get('user-cached')

    if (!cachedUser) {
      const user = await this.userRepository.getById(id)

      const preCachedUser = PrismaUserMapper.toPrisma(user)

      await this.redis.set('user-cached', JSON.stringify(preCachedUser), 'EX', 60)

      return PrismaUserMapper.toDomain(user)
    }

    return JSON.parse(cachedUser)
  }

  async auth(username: string, password: string): Promise<User> {
    return
  }

  async update(id: string, updateData: User): Promise<void> {
    return
  }
}
