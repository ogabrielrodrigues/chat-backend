import { makeUser } from '@test/factories/userFactory'
import { describe, expect, it } from 'vitest'

describe('User', () => {
  it('should be able to create a new user.', () => {
    const user = makeUser()

    expect(user).toBeTruthy()
  })
})
