import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'
import { CreateUser } from './createUser'

import { GetUsers } from './getUsers'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const getUsers = new GetUsers(inMemoryUserRepository)

describe('Get users', () => {
  it('should be able to get existing users.', async () => {
    const { user: user1 } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { user: user2 } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { users } = await getUsers.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual(expect.arrayContaining([user1, user2].map(PrismaUserMapper.toDomain)))
  })
})
