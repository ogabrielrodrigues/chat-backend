import { UserController } from '@controllers/userController'
import { prisma } from '@database/prisma/prisma'
import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'
import { CreateUser } from '@useCases/createUser'
import { GetUsers } from '@useCases/getUsers'

const prismaUserRepository = new PrismaUserRepository(prisma)
const createUser = new CreateUser(prismaUserRepository)
const getUsers = new GetUsers(prismaUserRepository)
const userController = new UserController(createUser, getUsers)

export { userController }
