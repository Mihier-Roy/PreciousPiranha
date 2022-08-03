import { Router } from "express";
import {
    authenticateUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers,
    deleteUserById,
    updateUserById,
    getUserById
} from "../controllers/userController";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(registerUser).get(verifyToken, verifyAdmin, getAllUsers);
router.post("/login", authenticateUser);
router.route("/profile").get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);
router
    .route("/:id")
    .delete(verifyToken, verifyAdmin, deleteUserById)
    .get(verifyToken, verifyAdmin, getUserById)
    .put(verifyToken, verifyAdmin, updateUserById);

export default router;
