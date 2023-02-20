import { Request, Response } from 'express'
import { resolve } from 'path'
import { User } from '@entities/user'

import { CreateUser } from '@useCases/user/createUser'
import { GetUsers } from '@useCases/user/getUsers'
import { CountUsers } from '@useCases/user/countUsers'
import { GetUserById } from '@useCases/user/getUserById'
import { UpdateUser } from '@useCases/user/updateUser'
import { GenerateConfirmationURL } from '@useCases/mail/generateConfirmationURL'

import { UpdateUserDTO } from '@dtos/updateUserDTO'
import { CreateUserDTO } from '@dtos/createUserDTO'
import { UserViewModel } from '@viewModels/userViewModel'
import { prismaUserErrors } from '@helpers/error/prismaUserErrors'

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUsers: GetUsers,
    private countUsers: CountUsers,
    private getUserById: GetUserById,
    private updateUser: UpdateUser,
    private generateConfirmationURL: GenerateConfirmationURL,
    private mailRepository: MailRepository
  ) {}

  async create(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body as CreateUserDTO

      const { user } = await this.createUser.execute({ username, email, password })

      const { confirmationURL } = this.generateConfirmationURL.execute({ user })

      this.mailRepository.activate(user.email, confirmationURL)

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

  async activate(request: Request, response: Response) {
    try {
      const userId = request.query.id as string

      const { user } = await this.getUserById.execute({ id: userId })

      user.active = true
      await this.updateUser.execute({ id: user.id, user })

      return response.status(200).sendFile(resolve(__dirname, '..', 'viewModels', 'activateViewModel.html'))
    } catch (err) {
      return response.status(400).send({ error: err })
    }
  }
}
