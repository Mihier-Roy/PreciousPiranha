import { Router } from "express";
import { authenticateUser, getUserProfile, registerUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser);
router.post("/login", authenticateUser);
router.route("/profile").get(verifyToken, getUserProfile);

export default router;
