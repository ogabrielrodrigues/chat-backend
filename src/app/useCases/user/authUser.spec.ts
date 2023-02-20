import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, it, expect } from 'vitest'
import { AuthUser } from './authUser'
import { CreateUser } from './createUser'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const authUser = new AuthUser(inMemoryUserRepository)

describe('Auth user', () => {
  it('should be able to auth a user', async () => {
    const { user } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { user: findedUser } = await authUser.execute({ username: user.username, password: user.password })

    expect(findedUser).toBeTruthy()
  })

  it('should not be able to auth a user with invalid credentials', async () => {
    const { user } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { user: findedUser } = await authUser.execute({
      username: user.username.toUpperCase(),
      password: user.password.toUpperCase()
    })

    expect(findedUser).toBeFalsy()
  })
})
