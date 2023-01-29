import { FastifyRequest, FastifyReply } from 'fastify'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const [, token] = request.headers.authorization.split(' ')

    const userDecoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof userDecoded === 'object') {
      request.userId = userDecoded.id
    } else {
      throw 'Unexpected error'
    }

    request.userId = userDecoded.id
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return reply.status(401).send({ error: err.message })
    }

    return reply.status(401).send({ error: err })
  }
}
