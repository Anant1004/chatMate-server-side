const handleSocketEvents = (io) => {
    const onlineUsers={};
    io.on('connection', (socket) => {
        socket.on('userId', (id) =>{
            onlineUsers[socket.id]=id;
            io.emit('onlineUsers',onlineUsers);
        } );

        socket.on('disconnect', () => {
            delete onlineUsers[socket.id];
            io.emit('userId',onlineUsers);
        });
    });
};

export default handleSocketEvents;
