import { User } from '@entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract getUsers(): Promise<User[]>
  abstract countUsers(): Promise<number>
  abstract getUserById(id: string): Promise<User>
}
