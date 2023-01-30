import { User } from '@entities/user'
import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'

import { CreateUser } from './createUser'
import { UpdateUser } from './updateUser'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const updateUser = new UpdateUser(inMemoryUserRepository)

describe('Update user', () => {
  it('should be able to update a user.', async () => {
    const { user } = await createUser.execute({
      name: faker.name.fullName(),
      username: faker.name.lastName(),
      age: parseInt(faker.random.numeric(2)),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const userBeforeUpdate = new User(
      {
        name: user.name,
        username: user.username,
        age: user.age,
        email: user.email
      },
      user.id,
      user.password
    )

    user.email = faker.internet.email()
    user.age = 54

    await updateUser.execute({ id: user.id, user })

    expect(inMemoryUserRepository.users[0]).not.toBe(userBeforeUpdate)
  })
})
