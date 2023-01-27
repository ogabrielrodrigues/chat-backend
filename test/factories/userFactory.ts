import { User } from '@entities/user'
import { faker } from '@faker-js/faker'

export function makeUser() {
  return new User({
    name: faker.name.fullName(),
    username: faker.name.lastName(),
    age: parseInt(faker.random.numeric(2)),
    email: faker.internet.email(),
    password: faker.internet.password(8)
  })
}
