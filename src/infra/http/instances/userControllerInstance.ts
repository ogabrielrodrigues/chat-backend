import { UserController } from '@controllers/userController'
import { prisma } from '@database/prisma/prisma'
import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'
import { redis } from '@database/redis/redis'
import { RedisUserRepository } from '@database/redis/repositories/redisUserRepository'
import { CountUsers } from '@useCases/countUsers'
import { CreateUser } from '@useCases/createUser'
import { GetUserById } from '@useCases/getUserById'
import { GetUsers } from '@useCases/getUsers'

const prismaUserRepository = new PrismaUserRepository(prisma)
const redisUserRepository = new RedisUserRepository(redis, prismaUserRepository)

const createUser = new CreateUser(redisUserRepository)
const getUsers = new GetUsers(redisUserRepository)
const countUsers = new CountUsers(prismaUserRepository)
const getUserById = new GetUserById(redisUserRepository)
const userController = new UserController(createUser, getUsers, countUsers, getUserById)

export { userController }
