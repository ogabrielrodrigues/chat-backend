import { UserController } from '../controllers/userController'
import { prisma } from '../../database/prisma/prisma'
import { PrismaUserRepository } from '../../database/prisma/repositories/prismaUserRepository'
import { CreateUser } from '../../../app/useCases/createUser'

const prismaUserRepository = new PrismaUserRepository(prisma)
const createUser = new CreateUser(prismaUserRepository)
const userController = new UserController(createUser)

export { userController }
