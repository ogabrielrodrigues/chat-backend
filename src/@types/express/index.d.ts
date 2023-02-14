import 'express'

declare module 'express' {
  export interface Request {
    user?: {
      id: string
      username: string
      email: string
      password: string
    }
  }
}
