import mongoose from "mongoose";

const connectToMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
    }  
};

export default connectToMongoose;