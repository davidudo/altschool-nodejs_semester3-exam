import { type Socket } from 'socket.io'

function adminSocket (socket: Socket): void {
  const socketId: string = socket.id

  // Listen for messages
  socket.on('order-status', (data: string): void => {
    console.log(`Message received from ${socketId}: ${data}`)

    socket.broadcast.emit('order-status', data)
  })
}

export default adminSocket
