import { type Socket } from 'socket.io'

function orderSocket (socket: Socket): void {
  const socketId: string = socket.id

  // Listen for messages
  socket.on('make-order', (data: any): void => {
    const receivedData: string = data
    console.log(`Message received from ${socketId}: ${receivedData}`)

    // TODO: Broadcast message to admin
    socket.broadcast.emit('order-status', 'Order Successful, pending')
  })
}

export default orderSocket
