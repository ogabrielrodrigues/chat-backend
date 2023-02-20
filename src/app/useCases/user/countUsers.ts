import { UserRepository } from '@repositories/userRepository'

interface CountUsersResponse {
  count: number
}

export class CountUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<CountUsersResponse> {
    const count = await this.userRepository.count()

    return {
      count
    }
  }
}
