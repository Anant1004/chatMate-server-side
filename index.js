import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './src/routes/authRoutes.js'
import friendsRoutes from './src/routes/friendsRoutes.js'
import connectToDb from './src/connections/db.js';
import morgan from 'morgan';
import authenticate from './src/middlewares/authorization.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use('/api/auth',authRoutes);
app.use('/api/friend-requests',authenticate,friendsRoutes);


app.get('/', (req, res) => {
    res.send('Hello World !!');
});


app.listen(PORT, () => {
    connectToDb();
    console.log(`App listening on port ${PORT}`);
});
