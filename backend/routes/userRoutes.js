import { Router } from "express";
import { authenticateUser, getUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", authenticateUser);
router.route("/profile").get(verifyToken, getUserProfile);

export default router;
