// This file is used to create logging transports using Winston.
import winston from "winston";

// Define logging format
const logFormat = winston.format.printf((info) => {
    return `[${info.timestamp}] ${info.level} ${info.message}`;
});

// Create log transports
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.prettyPrint(),
        logFormat
    ),
    transports: [
        // Writes ERROR levels to file
        new winston.transports.File({
            level: "error",
            filename: "./logs/error.log",
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Writes WARN and ERROR levels to file
        new winston.transports.File({
            level: "warn",
            filename: "./logs/warnings.log",
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Writes INFO, WARN and ERROR levels to fine
        new winston.transports.File({
            level: "info",
            filename: "./logs/requests.log",
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Writes DEBUG, INFO, WARN and ERROR levels to fine
        new winston.transports.File({
            level: "info",
            filename: "./logs/debug.log",
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Writes DEBUG, INFO, WARN and ERROR levels to fine
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

export default logger;
