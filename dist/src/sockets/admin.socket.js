"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminSocket(socket) {
    const socketId = socket.id;
    // Listen for messages
    socket.on('order-status', (data) => {
        console.log(`Message received from ${socketId}: ${data}`);
        socket.broadcast.emit('order-status', data);
    });
}
exports.default = adminSocket;
