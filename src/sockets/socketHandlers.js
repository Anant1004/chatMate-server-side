const handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

export default handleSocketEvents;
