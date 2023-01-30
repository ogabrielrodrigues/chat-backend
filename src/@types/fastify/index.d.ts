import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      id: string
      name: string
      username: string
      age: number
      email: string
      password: string
    }
  }
}
