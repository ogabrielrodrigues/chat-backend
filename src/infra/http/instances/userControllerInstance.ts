import { UserController } from '@controllers/userController'

import { CountUsers } from '@useCases/countUsers'
import { CreateUser } from '@useCases/createUser'
import { GetUserById } from '@useCases/getUserById'
import { GetUsers } from '@useCases/getUsers'
import { UpdateUser } from '@useCases/updateUser'
import { GenerateConfirmationURL } from '@useCases/generateConfirmationURL'

import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'
import { RedisUserRepository } from '@database/redis/repositories/redisUserRepository'
import { SESRepository } from '../../mail/aws/repositories/sesRepository'

import { prisma } from '@database/prisma/prisma'
import { redis } from '@database/redis/redis'
import { SESClient } from '../../mail/aws/ses'

const prismaUserRepository = new PrismaUserRepository(prisma)
const redisUserRepository = new RedisUserRepository(redis, prismaUserRepository)

const createUser = new CreateUser(redisUserRepository)
const getUsers = new GetUsers(redisUserRepository)
const countUsers = new CountUsers(prismaUserRepository)
const getUserById = new GetUserById(redisUserRepository)
const updateUser = new UpdateUser(prismaUserRepository)
const generateConfirmationURL = new GenerateConfirmationURL()

const sesRepository = new SESRepository(SESClient)

const userController = new UserController(
  createUser,
  getUsers,
  countUsers,
  getUserById,
  updateUser,
  generateConfirmationURL,
  sesRepository
)

export { userController }
