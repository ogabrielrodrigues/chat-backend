import { makeUser } from '@test/factories/userFactory'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'
import { CreateUser } from './createUser'

import { GetUsers } from './getUsers'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const getUsers = new GetUsers(inMemoryUserRepository)

describe('Get users', () => {
  it('should be able to get existing users.', async () => {
    const { user: user1 } = await createUser.execute(makeUser())
    const { user: user2 } = await createUser.execute(makeUser())

    const { users } = await getUsers.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual(expect.arrayContaining([user1, user2]))
  })
})
