import { User } from '@entities/user'
import { User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      age: user.age,
      email: user.email,
      password: user.password
    }
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        name: raw.name,
        username: raw.username,
        age: raw.age,
        email: raw.email
      },
      raw.id,
      raw.password
    )
  }
}
