import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const initializeSocket = (res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('join-org', (orgId: string) => {
        socket.join(`org-${orgId}`)
      })

      socket.on('message', (message) => {
        io.to(`org-${message.organizationId}`).emit('new-message', message)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
  return res.socket.server.io
} 