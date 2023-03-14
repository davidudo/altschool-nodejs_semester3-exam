import { type Socket } from 'socket.io'

function orderSocket (socket: Socket): void {
  const socketId: string = socket.id

  // Listen for messages
  socket.on('chat-message', (data: string): void => {
    console.log(`Message received from ${socketId}: ${data}`)

    // Broadcast message to all clients except sender
    socket.broadcast.emit('chat-message', data)
  })
}

export default orderSocket
