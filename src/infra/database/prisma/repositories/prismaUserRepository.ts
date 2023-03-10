import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

import { PrismaUserMapper } from '../mappers/prismaUserMapper'
import { PrismaClient } from '@prisma/client'

import { compare } from 'bcrypt'

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data: raw
    })
  }

  async get(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map(PrismaUserMapper.toDomain)
  }

  async count(): Promise<number> {
    const count = await this.prisma.user.count()

    return count
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return PrismaUserMapper.toDomain(user)
  }

  async auth(username: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      }
    })

    const passwordsMatch = await compare(password, user.password)

    if (!passwordsMatch) {
      throw 'Passwords do not match.'
    }

    return PrismaUserMapper.toDomain(user)
  }

  async update(id: string, updateData: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(updateData)

    await this.prisma.user.update({
      where: {
        id
      },
      data: raw
    })
  }
}
