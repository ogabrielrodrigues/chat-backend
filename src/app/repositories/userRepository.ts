import { User } from '@entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract get(): Promise<User[]>
  abstract count(): Promise<number>
  abstract getById(id: string): Promise<User>
  abstract auth(username: string, password: string): Promise<User>
  abstract update(id: string, updateData: User): Promise<void>
}
