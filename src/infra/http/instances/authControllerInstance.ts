import { AuthController } from '@controllers/authController'

import { prisma } from '@database/prisma/prisma'
import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'

import { AuthUser } from '@useCases/authUser'

const prismaUserRepository = new PrismaUserRepository(prisma)

const authUser = new AuthUser(prismaUserRepository)

const authController = new AuthController(authUser)

export { authController }
