import { authController } from '@instances/authControllerInstance'
import { userController } from '@instances/userControllerInstance'
import { Router } from 'express'
import { authMiddleware } from './infra/http/middlewares/authMiddleware'

const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).send({ message: 'Chat online!' })
})

routes.post('/auth', async (req, res) => await authController.authenticate(req, res))

// User
routes.post('/user', async (req, res) => await userController.create(req, res))
routes.get('/user', async (req, res) => await userController.list(req, res))
routes.get('/user/count', async (req, res) => await userController.count(req, res))
routes.get('/user/:id', async (req, res) => await userController.getById(req, res))
routes.put('/user', authMiddleware, async (req, res) => await userController.update(req, res))

export { routes }
