import { Router } from "express";
import {
    authenticateUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers
} from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser).get(verifyToken, verifyAdmin, getAllUsers);
router.post("/login", authenticateUser);
router.route("/profile").get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);

export default router;
