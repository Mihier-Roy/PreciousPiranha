import mongoose from "mongoose";
import logger from "../logger";

const connectDB = async () => {
    const connectionString = process.env.MONGO_URI;
    try {
        if (connectionString) {
            const conn = await mongoose.connect(connectionString, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            logger.warn(
                `Successfully connected to MongoDB. Connection Host: ${conn.connection.host}`
            );
        }
    } catch (error) {
        logger.error(`Error while connecting to MongoDB. Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
