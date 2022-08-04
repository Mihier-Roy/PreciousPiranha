import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found -> ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export { errorHandler, notFound };
