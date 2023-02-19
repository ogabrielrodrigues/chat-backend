import { CreateUser } from '@useCases/createUser'
import { Request, Response } from 'express'

import { prismaUserErrors } from '@helpers/error/prismaUserErrors'

import { CreateUserDTO } from '../dtos/createUserDTO'
import { GetUsers } from '@useCases/getUsers'
import { UserViewModel } from '@viewModels/userViewModel'
import { CountUsers } from '@useCases/countUsers'
import { GetUserById } from '@useCases/getUserById'
import { User } from '@entities/user'
import { UpdateUser } from '@useCases/updateUser'
import { UpdateUserDTO } from '../dtos/updateUserDTO'

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private countUsers: CountUsers,
    private getUserById: GetUserById,
    private updateUser: UpdateUser,
    private mailRepository: MailRepository
  ) {}

  async create(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body as CreateUserDTO

      const { user } = await this.createUser.execute({ username, email, password })

      this.mailRepository.activate(user.email)

      return response.status(201).send({ user: UserViewModel.toHttp(user) })
    } catch (err) {
      return response.status(400).send(prismaUserErrors.constraintAlreadyUsed(err))
    }
  }

  async list(request: Request, response: Response) {
    try {
      const { users } = await this.getUsers.execute()

      return response.status(200).send({ users: users.map(UserViewModel.toHttp) })
    } catch (err) {
      return response.status(400).send(err)
    }
  }

  async count(request: Request, response: Response) {
    try {
      const { count } = await this.countUsers.execute()

      return response.status(200).send({ count })
    } catch (err) {
      return response.status(400).send(err)
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params as Partial<User>

    try {
      const { user } = await this.getUserById.execute({ id })

      return response.status(200).send({ user: UserViewModel.toHttp(user) })
    } catch (err) {
      return response.status(400).send(err)
    }
  }

  async update(request: Request, response: Response) {
    try {
      let auth = request.user

      const data = request.body as UpdateUserDTO

      if (!auth) {
        throw 'User not authenticated.'
      }

      const user = {
        ...auth,
        ...data
      }

      const userUpdated = new User({ ...user }, auth.id, auth.password)
      const { user: res } = await this.updateUser.execute({ id: auth.id, user: userUpdated })

      return response.status(200).send({ user: UserViewModel.toHttp(res) })
    } catch (err) {
      return response.status(400).send({ error: err })
    }
  }
}
