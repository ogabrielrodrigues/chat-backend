import { User } from '@entities/user'
import { User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      active: user.active
    }
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        username: raw.username,
        email: raw.email,
        active: raw.active ?? false
      },
      raw.id,
      raw.password
    )
  }
}
