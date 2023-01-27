import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'

import { userController } from '@instances/userControllerInstance'

const app = fastify()
const port = process.env.PORT ?? 3333

app.register(cors, {
  origin: process.env.CORS_ORIGIN
})

// User
app.post('/user', async (req, rep) => await userController.create(req, rep))
app.get('/user', async (req, rep) => await userController.listUsers(req, rep))

app.listen({ port: parseInt(String(port)) }).then(() => console.log('Server is running.'))
