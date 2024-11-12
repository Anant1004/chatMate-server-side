import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './src/routes/authRoutes.js'
import connectToDb from './src/connections/db.js';
import morgan from 'morgan';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use('/api/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World !!');
});


app.listen(PORT, () => {
    connectToDb();
    console.log(`App listening on port ${PORT}`);
});
