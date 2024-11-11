import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connectToDb from './connections/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use('/api/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World !!');
});


app.listen(PORT, () => {
    connectToDb();
    console.log(`App listening on port ${PORT}`);
});
