import 'express'

declare module 'express' {
  export interface Request {
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
