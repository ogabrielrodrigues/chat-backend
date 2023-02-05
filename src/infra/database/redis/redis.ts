import { logger } from '@helpers/logger/log'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.UPSTASH_REDIS_URL)
  .on('error', err => {
    console.log('Error on redis.')
    console.error(err)
    process.exit(1)
  })
  .on('connect', () => logger('redis', 'connect', 'Redis connected'))

export { redis }
