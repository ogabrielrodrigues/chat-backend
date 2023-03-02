import 'dotenv/config'

import { logger } from '@helpers/logger/log'
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { routes } from './routes'

interface ChatUser {
  id: string
  socket_id: string
  username: string
  email: string
  password: string
  active: boolean
  room: string
}

interface Message {
  user: ChatUser
  content: string
  sendedAt: string
  room: string
}

interface NewUserJoinedResponse {
  user: ChatUser
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

const users: ChatUser[] = []
// const rooms: string[] = []
const messages: Message[] = []

function getPrevMessages(room: string) {
  const prevMessages = messages.filter(message => message.room === room)

  return prevMessages
}

io.on('connection', socket => {
  logger('io', 'connection', 'New user connected: ' + socket.id)

  socket.on('join_room', ({ user, room }: NewUserJoinedResponse) => {
    socket.join(room)

    const userInRoom = users.find(usr => usr.username === user.username && usr.room === user.room)

    if (userInRoom) {
      /* eslint no-unused-expressions: "off" */
      userInRoom.socket_id === socket.id
    } else {
      users.push(user)
    }

    const prevMessages = getPrevMessages(room)
    io.to(room).emit('prev_messages', { messages: prevMessages })
  })

  socket.on('message', (message: Message) => {
    console.log('user: %s, sended message: %s , on room: %s', message.user.username, message.content, message.room)
    messages.push(message)

    io.to(message.room).emit('message', message)
  })
})

http.listen(port, () => logger('server', 'listen', `Server is running on ::${port}`))
