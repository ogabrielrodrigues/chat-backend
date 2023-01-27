import { Redis } from 'ioredis'

const redis = new Redis(process.env.UPSTASH_REDIS_URL)
  .on('error', err => {
    console.log('Error on redis.')
    console.error(err)
    process.exit(1)
  })
  .on('connect', () => console.log('Redis connected.'))

export { redis }
