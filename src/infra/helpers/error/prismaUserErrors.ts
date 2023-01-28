import { Prisma } from '@prisma/client'

export class prismaUserErrors {
  static contraintAlreadyUsed(err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return {
          error: `This ${err.meta.target[0]} has already been used by another user.`
        }
      }
    } else {
      return {
        error: 'Unexpected error.'
      }
    }
  }
}
