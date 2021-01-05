import mongoose from "mongoose";
import logger from "../logger.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        logger.warn(`Successfully connected to MongoDB. Connection Host: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error while connecting to MongoDB. Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
