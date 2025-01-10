const handleSocketEvents = (io) => {
    const onlineUsers = {}; // Store online users

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('userName', (userName) => {
            onlineUsers[socket.id] = userName;
            io.emit('onlineUsers', onlineUsers);
            console.log("after connection : ",onlineUsers);
            
        });

        socket.on('sendMessage', (payload) => console.log(payload.content));

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
            console.log("Before disconnect : ",onlineUsers);
            
            delete onlineUsers[socket.id];
            io.emit('onlineUsers', onlineUsers);
            console.log("After disconnect : ",onlineUsers);
            
        });
    });
};

export default handleSocketEvents;
