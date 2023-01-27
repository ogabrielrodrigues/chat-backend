import { User } from '@entities/user'

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      age: user.age,
      email: user.email
    }
  }
}
