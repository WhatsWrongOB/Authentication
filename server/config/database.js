import mongoose from "mongoose";


const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error.message)
        process.exit(0);
    }
}

export default connectDatabase