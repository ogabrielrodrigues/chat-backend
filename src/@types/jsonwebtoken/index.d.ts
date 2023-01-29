import { User } from '@entities/user'
import 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string
    user: User
  }
}
