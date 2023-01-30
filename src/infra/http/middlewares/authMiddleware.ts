import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

async function authMiddleware(request: Request, reply: Response, next: NextFunction) {
  try {
    const [, token] = request.headers.authorization.split(' ')

    const userDecoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof userDecoded === 'object') {
      request.user = userDecoded.user
      next()
    } else {
      throw 'Unexpected error'
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return reply.status(401).send({ error: err.message })
    }

    return reply.status(401).send({ error: err })
  }
}
