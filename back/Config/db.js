import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI,)
        console.log('connected with mongodb')
    } catch (error) {
        console.error(error, "connection error:")
        process.exit(1)
    }
}

export default connectDB;