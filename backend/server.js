import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./logger.js";

// Load environment variables
dotenv.config();

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
app.get("/", (req, res) => {
    res.json("API is running");
});

// Fetch the port to listen on from the environment file or fallback to port 5000
const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) logger.error("Error while starting server! Error : ", err);
    else
        logger.warn(
            `Application running in [${process.env.NODE_ENV}] mode. Server listening on : ${port}`
        );
});
