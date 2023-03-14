"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function orderSocket(socket) {
    const socketId = socket.id;
    // Listen for messages
    socket.on('chat-message', (data) => {
        console.log(`Message received from ${socketId}: ${data}`);
        // Broadcast message to all clients except sender
        socket.broadcast.emit('chat-message', data);
    });
}
exports.default = orderSocket;
