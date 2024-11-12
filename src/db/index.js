import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World !!');
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
