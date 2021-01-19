import { Router } from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(verifyToken, addOrderItems);

export default router;