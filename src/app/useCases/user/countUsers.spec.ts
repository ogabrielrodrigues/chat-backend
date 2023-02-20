import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'
import { CountUsers } from './countUsers'
import { CreateUser } from './createUser'

const inMemoryUserRepository = new InMemoryUserRepository()
const countUsers = new CountUsers(inMemoryUserRepository)
const createUser = new CreateUser(inMemoryUserRepository)

describe('Count users', () => {
  it('should be able to count users.', async () => {
    await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { count } = await countUsers.execute()

    expect(count).toEqual(2)
  })
})
