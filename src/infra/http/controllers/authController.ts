import { AuthUser } from '@useCases/authUser'
import { Request, Response } from 'express'
import { AuthenticateDTO } from '../dtos/authenticateDTO'
import jwt from 'jsonwebtoken'
import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'

export class AuthController {
  constructor(private authUser: AuthUser) {}

  async authenticate(request: Request, response: Response) {
    try {
      const { username, password } = request.body as AuthenticateDTO

      const { user } = await this.authUser.execute({ username, password })

      const token = jwt.sign({ user: PrismaUserMapper.toPrisma(user) }, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: 86400000 // 1 day
      })

      return response.status(200).send({ token })
    } catch (err) {
      return response.status(206).send({ error: err })
    }
  }
}
