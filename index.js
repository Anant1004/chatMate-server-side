import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import mongoose from 'mongoose';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use('/api/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World !!');
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
        
            console.log(`Server running on port ${process.env.PORT || 4000}`);
        
    })
    .catch((error) => console.log("Failed to connect", error));