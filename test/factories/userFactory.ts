import { User } from '@entities/user'
import { faker } from '@faker-js/faker'

export function makeUser() {
  return new User({
    username: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8)
  })
}
