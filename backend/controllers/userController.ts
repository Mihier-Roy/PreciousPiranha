import { Request } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel";
import { generateToken } from "../utils/generateToken";

interface UserRequest extends Request {
    user?: User;
}

// Description 	: Authenticates the user and returns a JWT to be uesd in future requests
// Route 		: POST /api/users/login
export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            name: user.name,
            token: generateToken(user._id),
            isAdmin: user.isAdmin
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
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
        res.status(400);
        throw new Error("User exists");
    }

    // Create a new user. If creation is successful, return a JWT.
    // Password salting and hashing is implemented as a pre-save middleware via mongoose.
    // Please check ../models/userModel.js for the complete implementation
    const user = await UserModel.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201);
        res.json({
            name: user.name,
            token: generateToken(user._id),
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error("Invalid user data.");
    }
});

// [PROTECTED ROUTE - Requires Authorization]
// Description 	: Return user profile information when provided with the id of a user account
// Route 		: GET /api/users/profile
export const getUserProfile = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const user = await UserModel.findById(req.user._id);

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
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

// [PROTECTED ROUTE - Requires Authorization]
// Description 	: Update the profile for the authorized user
// Route 		: PUT /api/users/profile
export const updateUserProfile = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const user = await UserModel.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                name: updatedUser.name,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404);
            throw new Error("No user found");
        }
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

// [PROTECTED ROUTE - Requires Authorization - ADMIN ONLY]
// Description 	: Returns all users
// Route 		: GET /api/users
export const getAllUsers = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const users = await UserModel.find({});
        res.json(users);
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

// [PROTECTED ROUTE - Requires Authorization - ADMIN ONLY]
// Description 	: Deletes a given user
// Route 		: DELETE /api/users/:id
export const deleteUserById = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const user = await UserModel.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: "Action completed!" });
        } else {
            res.status(404);
            throw new Error("Invalid user");
        }
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

// [PROTECTED ROUTE - Requires Authorization - ADMIN ONLY]
// Description 	: Returns user info
// Route 		: GET /api/users/:id
export const getUserById = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const user = await UserModel.findById(req.params.id).select("-password");

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error("Invalid user");
        }
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});

// [PROTECTED ROUTE - Requires Authorization - ADMIN ONLY]
// Description 	: Updates a given user
// Route 		: PUT /api/users/:id
export const updateUserById = asyncHandler(async (req: UserRequest, res) => {
    if (req.user) {
        const user = await UserModel.findById(req.params.id).select("-password");

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin;

            const updatedUser = await user.save();
            res.json({
                id: updatedUser._id,
                token: generateToken(updatedUser._id),
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            });
        } else {
            res.status(404);
            throw new Error("Invalid user");
        }
    } else {
        res.status(400);
        throw new Error("Invalid request");
    }
});
