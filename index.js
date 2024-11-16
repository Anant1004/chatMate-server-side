import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import friendsRoutes from './src/routes/friendsRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import connectToDb from './src/connections/db.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authenticate from './src/middlewares/authorization.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/friend-requests', authenticate, friendsRoutes);
app.use('/api/messages', authenticate, messageRoutes);
app.use('/api/groups', authenticate, groupRoutes);

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT','PATCH','OPTIONS','DELETE'],
        credentials: true
    }
});

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room (roomId can be user ID or group ID)
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Handle message sending
    socket.on('send-message', (messageData) => {
        const { roomId, sender, text } = messageData;
        console.log(`Message from ${sender} to room ${roomId}: ${text}`);
        io.to(roomId).emit('receive-message', {
            sender,
            text,
            timestamp: new Date()
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () => {
    connectToDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
