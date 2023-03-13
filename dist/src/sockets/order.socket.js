"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function orderSocket(socket) {
    // Listen for messages
    socket.on('chat-message', (data) => {
        console.log(`Message received from ${socket.id}: ${data}`);
        // Broadcast message to all clients except sender
        socket.broadcast.emit('chat-message', data);
    });
}
exports.default = orderSocket;
