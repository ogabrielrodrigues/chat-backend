import 'dotenv/config'

import { logger } from '@helpers/logger/log'
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { routes } from './routes'

const app = express()
const http = createServer(app)

const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN
  }
})
const port = process.env.PORT ?? 3333

app.use(express.json())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(routes)

io.on('connection', socket => {
  logger('io', 'connect', 'Socket open!')

  socket.on('message', msg => {
    console.log(msg)
  })
}).on('close', () => logger('io', 'disconnect', 'Socket closed.'))

app.listen(port, () => logger('server', 'listen', `Server is running on ::${port}`))
