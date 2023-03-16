"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function orderSocket(socket) {
    const socketId = socket.id;
    // Listen for messages
    socket.on('make-order', (data) => {
        const receivedData = data;
        console.log(`Message received from ${socketId}: ${receivedData}`);
        // TODO: Broadcast message to admin
        socket.broadcast.emit('order-status', 'Order Successful, pending');
    });
}
exports.default = orderSocket;
