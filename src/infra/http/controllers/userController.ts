import { CreateUser } from '@useCases/createUser'
import { FastifyRequest, FastifyReply } from 'fastify'

import { prismaUserErrors } from '@helpers/error/prismaUserErrors'

import { CreateUserDTO } from '../dtos/createUserDTO'
import { GetUsers } from '@useCases/getUsers'
import { UserViewModel } from '@viewModels/userViewModel'

export class UserController {
  constructor(private createUser: CreateUser, private getUsers: GetUsers) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, username, age, email, password } = request.body as CreateUserDTO

      const { user } = await this.createUser.execute({ name, username, age, email, password })

      return reply.status(201).send({ user: UserViewModel.toHttp(user) })
    } catch (err) {
      return reply.status(400).send(prismaUserErrors.emailAlreadyUsed(err))
    }
  }

  async listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { users } = await this.getUsers.execute()

      return reply.status(200).send({ users: users.map(UserViewModel.toHttp) })
    } catch (err) {
      return reply.status(400).send(err)
    }
  }
}
