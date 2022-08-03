import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import logger from "../logger.js";
import User from "../models/userModel";

interface IjwtRequest extends Request {
    user?: User;
}

export const verifyToken = asyncHandler(
    async (req: IjwtRequest, res: Response, next: NextFunction) => {
        let token;

        // Check if Authorization header is set and is in the format of a Bearer token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract the token out of the Authorization header
            token = req.headers.authorization.split(" ")[1];

            try {
                // Verify the token and set req.user to contain the user information (excluding the password),
                // before forwarding the request to the next handler

                if (process.env.JWT_SECRET) {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenInterface;
                    req.user = await User.findById(decoded.id).select("-password");
                    next();
                }
            } catch (error) {
                logger.error(`JWT Verification failed. Error : ${error}`);
                res.status(401);
                throw new Error("Unauthorized");
            }
        }

        if (!token) {
            logger.error(`JWT Verification failed. Error : No token provided in the request`);
            res.status(401);
            throw new Error("Unauthorized");
        }
    }
);

export const verifyAdmin = (req: IjwtRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Unauthorized");
    }
};
