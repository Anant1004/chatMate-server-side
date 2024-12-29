import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import friendsRoutes from './src/routes/friendsRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import connectToDb from './src/connections/db.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authenticate from './src/middlewares/authorization.js';
import handleSocketEvents from './src/sockets/socketHandlers.js';

dotenv.config({
    path:'./.env'
})
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
    origin: [process.env.FRONT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'], 
    credentials: true 
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/friend-requests', authenticate, friendsRoutes);
app.use('/api/messages', authenticate, messageRoutes);
app.use('/api/groups', authenticate, groupRoutes);

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONT_URL,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
        credentials: true
    }
});

// Socket.IO events handle
handleSocketEvents(io);

server.listen(PORT, () => {
    connectToDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
