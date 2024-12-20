const handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('sendMessage', (message) => {
            const { text, targetUser} = message;
            // message dega
            console.log(`Message from ${targetUser} is ${text}`);
        });

        // Join a specific room
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room: ${roomId}`);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

export default handleSocketEvents;
