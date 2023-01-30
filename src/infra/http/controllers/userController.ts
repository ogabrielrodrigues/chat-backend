import { CreateUser } from '@useCases/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'

import { prismaUserErrors } from '@helpers/error/prismaUserErrors'

import { CreateUserDTO } from '../dtos/createUserDTO'
import { GetUsers } from '@useCases/getUsers'
import { UserViewModel } from '@viewModels/userViewModel'
import { CountUsers } from '@useCases/countUsers'
import { GetUserById } from '@useCases/getUserById'
import { User } from '@entities/user'
import { UpdateUser } from '@useCases/updateUser'
import { UpdateUserDTO } from '../dtos/updateUserDTO'
import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private countUsers: CountUsers,
    private getUserById: GetUserById,
    private updateUser: UpdateUser
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, username, age, email, password } = request.body as CreateUserDTO

      const { user } = await this.createUser.execute({ name, username, age, email, password })

      return reply.status(201).send({ user: UserViewModel.toHttp(user) })
    } catch (err) {
      return reply.status(400).send(prismaUserErrors.contraintAlreadyUsed(err))
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { users } = await this.getUsers.execute()

      return reply.status(200).send({ users: users.map(UserViewModel.toHttp) })
    } catch (err) {
      return reply.status(400).send(err)
    }
  }

  async count(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { count } = await this.countUsers.execute()

      return reply.status(200).send({ count })
    } catch (err) {
      return reply.status(400).send(err)
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as Partial<User>

    try {
      const { user } = await this.getUserById.execute({ id })

      return reply.status(200).send({ user: UserViewModel.toHttp(user) })
    } catch (err) {
      return reply.status(400).send(err)
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      let auth = request.user
      const data = request.body as UpdateUserDTO

      if (!auth) {
        throw 'User not authenticated.'
      }

      let { user: raw } = await this.getUserById.execute({ id: auth.id })

      const user = PrismaUserMapper.toPrisma(raw)

      const userUpdated = new User({ ...data, ...user, password: undefined }, user.id, user.password)

      const { user: response } = await this.updateUser.execute({ id: auth.id, user: userUpdated })

      return reply.status(200).send({ user: UserViewModel.toHttp(response) })
    } catch (err) {
      return reply.status(400).send({ error: err })
    }
  }
}
