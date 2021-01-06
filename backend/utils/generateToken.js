import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { algorithm: "HS512" });
};
