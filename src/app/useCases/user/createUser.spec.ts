import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'

import { CreateUser } from './createUser'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)

describe('Create user', () => {
  it('should be able to create a new user.', async () => {
    const { user } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    expect(inMemoryUserRepository.users).toBeTruthy()
    expect(inMemoryUserRepository.users[0]).toEqual(user)
  })
})
