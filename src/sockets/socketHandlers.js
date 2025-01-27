const handleSocketEvents = (io) => {
    const onlineUsers = {}; // Store online users
    function findUserId(socketId){
        for(let key in onlineUsers){
            if(onlineUsers[key] === socketId){
                return key;
            }
        }
        return null;
    };

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('userName', (userName) => {
            onlineUsers[userName] = socket.id;
            io.emit('onlineUsers', onlineUsers);
            console.log("after connection : ",onlineUsers);
            
        });

        socket.on('message',(payload) => {
            io.to(onlineUsers[payload.to]).emit('message', payload);
        })

        socket.on("groupMessage",(payload)=>io.emit('groupMessage', payload));

        // Handle user disconnection
        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
            
            delete onlineUsers[findUserId(socket.id)];
            io.emit('onlineUsers', onlineUsers);
            console.log("After disconnect : ",onlineUsers);
            
        });
    });
};

export default handleSocketEvents;
