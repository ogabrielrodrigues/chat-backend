import 'dotenv/config'
// import cors from 'cors'
// import express from 'express'
import cors from '@fastify/cors'
// import { UserController } from '@controllers/userController'
// import { PrismaUserRepository } from '@database/prisma/repositories/prismaUserRepository'
// import { CreateUser } from '@useCases/createUser'
// import { prisma } from '@database/prisma/prisma'
import fastify from 'fastify'
import { userController } from '@instances/userControllerInstance'

// const prismaUserRepository = new PrismaUserRepository(prisma)
// const createUser = new CreateUser(prismaUserRepository)
// const userController = new UserController(createUser)

const app = fastify()
app.register(cors, {
  origin: process.env.CORS_ORIGIN
})

app.post('/user', async (req, res) => await userController.create(req, res))

const port = process.env.PORT ?? 3333

app.listen({ port: parseInt(String(port)) }).then(() => console.log('Server is running.'))
