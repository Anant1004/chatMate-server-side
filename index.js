import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import friendsRoutes from './src/routes/friendsRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js'
import groupRoutes from './src/routes/groupRoutes.js'
import connectToDb from './src/connections/db.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authenticate from './src/middlewares/authorization.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/friend-requests', authenticate, friendsRoutes);
app.use('/api/messages', authenticate, messageRoutes);
app.use('/api/groups', authenticate, groupRoutes);


app.listen(PORT, () => {
    connectToDb();
    console.log(`App listening on port ${PORT}`);
});
