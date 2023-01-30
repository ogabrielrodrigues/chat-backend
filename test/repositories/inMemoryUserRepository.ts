import { User } from '@entities/user'
import { UserRepository } from '@repositories/userRepository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: User) {
    this.users.push(user)
  }

  async get(): Promise<User[]> {
    return this.users
  }

  async count(): Promise<number> {
    return this.users.length
  }

  async getById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async auth(username: string, password: string): Promise<User> {
    return this.users.find(user => user.username === username && user.password === password)
  }

  async update(id: string, updateData: User): Promise<void> {
    const index = this.users.findIndex(user => user.id === id)

    if (index >= 0) {
      this.users[index] = updateData
    }
  }
}
