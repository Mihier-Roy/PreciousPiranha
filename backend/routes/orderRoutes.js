import { Router } from "express";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(verifyToken, addOrderItems);
router.route("/:id").get(verifyToken, getOrderById);

export default router;
