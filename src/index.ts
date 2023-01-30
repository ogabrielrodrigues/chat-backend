import 'dotenv/config'
import cors from '@fastify/cors'
import { authController } from '@instances/authControllerInstance'
import { userController } from '@instances/userControllerInstance'
import fastify from 'fastify'
// import { authMiddleware } from './infra/http/middlewares/authMiddleware'

const app = fastify()
const port = process.env.PORT ?? 3333

app.register(cors, {
  origin: process.env.CORS_ORIGIN
})

app.post('/auth', async (req, rep) => await authController.authenticate(req, rep))

// User
app.post('/user', async (req, rep) => await userController.create(req, rep))
app.get('/user', async (req, rep) => await userController.list(req, rep))
app.get('/user/count', async (req, rep) => await userController.count(req, rep))
app.get('/user/:id', async (req, rep) => await userController.getById(req, rep))
app.put('/user', async (req, rep) => await userController.update(req, rep))

app.listen({ port: parseInt(String(port)) }).then(() => console.log('Server is running.'))
