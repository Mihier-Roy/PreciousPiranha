import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// Description 	: Authenticates the user and returns a JWT to be uesd in future requests
// Route 		: POST /api/users/login
export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            name: user.name,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// Description 	: Registers a new user to the application and responds with a token upon successful creatinon.
// Route 		: POST /api/users
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already has an account. Return error if true
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        res.status(400);
        throw new Error("User exists");
    }

    // Create a new user. If creation is successful, return a JWT.
    // Password salting and hashing is implemented as a pre-save middleware via mongoose.
    // Please check ../models/userModel.js for the complete implementation
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201);
        res.json({
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid user data.");
    }
});

// [PROTECTED ROUTE - Requires Authorization]
// Description 	: Return user profile information when provided with the id of a user account
// Route 		: GET /api/users/profile
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
