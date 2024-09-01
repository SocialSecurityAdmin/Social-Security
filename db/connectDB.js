import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONN_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Error Connecting to MongoDB: ", error.message)
        process.exit(1)
    }
}