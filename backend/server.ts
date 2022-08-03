import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import helmet from "helmet";
import logger from "./logger.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paypalRoutes from "./routes/paypalRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import morganMiddleware from "./middleware/morganMiddleware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create express instance
const app = express();

// Middleware to parse JSON POST body
app.use(express.json());

// Add helmet middleware
app.use(helmet());

// Add Morgan middleware for request logging
app.use(morganMiddleware);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paypal", paypalRoutes);

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Fetch the port to listen on from the environment file or fallback to port 5000
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) logger.error("Error while starting server! Error : ", err);
    else
        logger.warn(
            `Application running in [${process.env.NODE_ENV}] mode. Server listening on : ${port}`
        );
});
