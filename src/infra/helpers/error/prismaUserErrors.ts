import { Prisma } from '@prisma/client'

export class prismaUserErrors {
  static emailAlreadyUsed(err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return {
          error: 'This email has already been used by another user.'
        }
      }
    } else {
      return {
        error: 'Unexpected error.'
      }
    }
  }
}
