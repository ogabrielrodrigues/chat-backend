import { PrismaUserMapper } from '@database/prisma/mappers/prismaUserMapper'
import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'
import { CreateUser } from './createUser'
import { GetUserById } from './getUserById'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const getUsersById = new GetUserById(inMemoryUserRepository)

describe('Get user by id', () => {
  it('should be able to get user by your id.', async () => {
    const { user: user1 } = await createUser.execute({
      name: faker.name.fullName(),
      username: faker.name.lastName(),
      age: parseInt(faker.random.numeric(2)),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    await createUser.execute({
      name: faker.name.fullName(),
      username: faker.name.lastName(),
      age: parseInt(faker.random.numeric(2)),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { user } = await getUsersById.execute({ id: user1.id })

    expect(user).toBeTruthy()
    expect(user).toEqual(PrismaUserMapper.toDomain(user1))
  })
})
