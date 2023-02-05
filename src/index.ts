import 'dotenv/config'

import { logger } from '@helpers/logger/log'
import cors from 'cors'
import express from 'express'

import { routes } from './routes'

const app = express()
const port = process.env.PORT ?? 3333

app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(routes)

app.listen(port, () => logger('server', 'listen', `Server is running on ::${port}`))
