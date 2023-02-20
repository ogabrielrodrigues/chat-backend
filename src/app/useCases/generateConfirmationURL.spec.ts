import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '@test/repositories/inMemoryUserRepository'
import { describe, expect, it } from 'vitest'

import { CreateUser } from './createUser'
import { GenerateConfirmationURL } from './generateConfirmationURL'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUser(inMemoryUserRepository)
const generateConfirmationURL = new GenerateConfirmationURL()

describe('Generate confirmation URL', () => {
  it('should be able to generate a new confirmation URL.', async () => {
    const { user } = await createUser.execute({
      username: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    const { confirmationURL } = generateConfirmationURL.execute({ user })

    expect(confirmationURL).toBeTruthy()
    expect(confirmationURL).contains(user.id)
  })
})
