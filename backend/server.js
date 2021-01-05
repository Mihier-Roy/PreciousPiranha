import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./logger.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create express instance
const app = express();

// Add helmet middleware
app.use(helmet());

// Add Morgan middleware for request logging
app.use(
    morgan(
        ":remote-addr - :method :url HTTP/:http-version :status :res[content-length] :referrer",
        { stream: logger.stream }
    )
);

// Routes
app.use("/api/products", productRoutes);

// Fetch the port to listen on from the environment file or fallback to port 5000
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) logger.error("Error while starting server! Error : ", err);
    else
        logger.warn(
            `Application running in [${process.env.NODE_ENV}] mode. Server listening on : ${port}`
        );
});
