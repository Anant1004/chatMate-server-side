import mongoose from 'mongoose'

const connectToDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error connecting", error.message)
    }
}

export default connectToDb