import 'dotenv/config'

import { logger } from '@helpers/logger/log'
import cors from 'cors'
import express from 'express'
import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { routes } from './routes'

interface Message {
  authorId: string
  username: string
  content: string
  sendedAt: string
}

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

const room = randomUUID()

io.sockets.on('connection', socket => {
  const userId = socket.id

  socket.emit('ready', { status: `connected: ${userId}` })
  socket.join(`room_${room}`)
  socket.emit('joined_on_room', room)

  socket.on('new_message', (msg: Message) => {
    io.emit('replies', msg)
  })
})

http.listen(port, () => logger('server', 'listen', `Server is running on ::${port}`))
