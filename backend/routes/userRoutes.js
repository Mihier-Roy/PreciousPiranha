import { Router } from "express";
import {
    authenticateUser,
    getUserProfile,
    registerUser,
    updateUserProfile
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser);
router.post("/login", authenticateUser);
router.route("/profile").get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);

export default router;
