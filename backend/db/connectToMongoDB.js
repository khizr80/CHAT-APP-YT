import mongoose, { Mongoose } from "mongoose";
const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_db_URI)
        console.log("done");
    } catch (error) {
        console.log("error connecting ",error.message);
        
    }
}
export default connectToMongoDB