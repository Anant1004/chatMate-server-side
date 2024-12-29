const handleSocketEvents = (io) => {
    const onlineUsers = {}; // Store online users

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('userId', (id) => {
            onlineUsers[socket.id] = id;
            io.emit('onlineUsers', onlineUsers);
            console.log("Updated online users:", onlineUsers);
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
            delete onlineUsers[socket.id];
            io.emit('onlineUsers', onlineUsers);
            console.log("Updated online users after disconnection:", onlineUsers);
        });
    });
};

export default handleSocketEvents;
