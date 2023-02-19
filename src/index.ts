import 'dotenv/config'

import { logger } from '@helpers/logger/log'
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { routes } from './routes'

interface Message {
  authorId: string
  username: string
  content: string
  sendedAt: string
  room: string
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

io.sockets.on('connection', socket => {
  const userId = socket.id
  io.emit('ready', { status: `connected: ${userId}` })

  socket.on('join', (room: string) => {
    socket.join(room)
    io.emit('joined', room)
  })

  socket.on('new_message', (msg: Message) => {
    console.log('user: %s, sended message: %s , on room: %s', msg.username, msg.content, msg.room)
    io.to(msg.room).emit('replies', msg)
  })
})

http.listen(port, () => logger('server', 'listen', `Server is running on ::${port}`))
