import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: User) {
    this.users.push(user)
  }

  async getUsers(): Promise<User[]> {
    return this.users
  }

  async countUsers(): Promise<number> {
    return this.users.length
  }
}
