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

  async getUserById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async authUser(username: string, password: string): Promise<User> {
    return this.users.find(user => user.username === username && user.password === password)
  }
}
