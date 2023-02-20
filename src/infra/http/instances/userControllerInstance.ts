import { UserController } from '@controllers/userController'

import { CountUsers } from '@useCases/user/countUsers'
import { CreateUser } from '@useCases/user/createUser'
import { GetUserById } from '@useCases/user/getUserById'
import { GetUsers } from '@useCases/user/getUsers'
import { UpdateUser } from '@useCases/user/updateUser'
import { GenerateConfirmationURL } from '@useCases/mail/generateConfirmationURL'

import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'
import { RedisUserRepository } from '@database/redis/repositories/redisUserRepository'
import { MailTrapRepository } from '../../mail/mailtrap/repositories/mailTrapRepository'

import { prisma } from '@database/prisma/prisma'
import { redis } from '@database/redis/redis'
import { mailtrap } from '../../mail/mailtrap/mailtrap'

const prismaUserRepository = new PrismaUserRepository(prisma)
const redisUserRepository = new RedisUserRepository(redis, prismaUserRepository)

const createUser = new CreateUser(redisUserRepository)
const getUsers = new GetUsers(redisUserRepository)
const countUsers = new CountUsers(prismaUserRepository)
const getUserById = new GetUserById(redisUserRepository)
const updateUser = new UpdateUser(prismaUserRepository)
const generateConfirmationURL = new GenerateConfirmationURL()

const mailTrapRepository = new MailTrapRepository(mailtrap)

const userController = new UserController(
  createUser,
  getUsers,
  countUsers,
  getUserById,
  updateUser,
  generateConfirmationURL,
  mailTrapRepository
)

export { userController }
