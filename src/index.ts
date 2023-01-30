import 'dotenv/config'

import { authController } from '@instances/authControllerInstance'
import { userController } from '@instances/userControllerInstance'
import cors from 'cors'
import express from 'express'
// import { authMiddleware } from './infra/http/middlewares/authMiddleware'

const app = express()
const port = process.env.PORT ?? 3333

app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'RESTful API online!' })
})

app.post('/auth', async (req, res) => await authController.authenticate(req, res))

// User
app.post('/user', async (req, res) => await userController.create(req, res))
app.get('/user', async (req, res) => await userController.list(req, res))
app.get('/user/count', async (req, res) => await userController.count(req, res))
app.get('/user/:id', async (req, res) => await userController.getById(req, res))
app.put('/user', async (req, res) => await userController.update(req, res))

app.listen(port, () => console.log('Server is running on %s', port))
