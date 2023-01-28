import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

import { PrismaUserMapper } from '../mappers/prismaUserMapper'
import { PrismaClient } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data: raw
    })
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map(PrismaUserMapper.toDomain)
  }

  async countUsers(): Promise<number> {
    const count = await this.prisma.user.count()

    return count
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return PrismaUserMapper.toDomain(user)
  }
}
