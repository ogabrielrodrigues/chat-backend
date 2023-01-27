import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { CreateUser } from '@useCases/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'

import { prismaUserErrors } from '@helpers/error/prismaUserErrors'

import { CreateUserDTO } from '../dtos/createUserDTO'

export class UserController {
  constructor(private createUser: CreateUser) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, username, age, email, password } = request.body as CreateUserDTO

      const { user } = await this.createUser.execute({ name, username, age, email, password })

      return reply.status(201).send({ user: PrismaUserMapper.toPrisma(user) })
    } catch (err) {
      return reply.status(400).send(prismaUserErrors.emailAlreadyUsed(err))
    }
  }
}
