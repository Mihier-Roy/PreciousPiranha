import jwt from "jsonwebtoken";
import crypto from "crypto";

const key = process.env.JWT_SECRET || crypto.randomBytes(20).toString("hex");
export const generateToken = (id: string) => {
    return jwt.sign({ id: id } as TokenInterface, key, { algorithm: "HS512" });
};
