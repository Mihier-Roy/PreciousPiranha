import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// Description 	: Authenticates the user and returns a JWT to be uesd in future requests
// Route 		: /api/users/login
export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// Description 	: Return user profile information when provided with the id of a user account
// Route 		: /api/users/login
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("No user found");
    }
});
