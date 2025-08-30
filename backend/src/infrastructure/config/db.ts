import mongoose from "mongoose";
import dotenv from "dotenv";    

dotenv.config();    


export const connectDB = async () => {
    try {
        console.log("🔌 Connecting to Database...",process.env.MONGO_URI) ;
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("✅ Database Connected!");
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        process.exit(1);
    }
}