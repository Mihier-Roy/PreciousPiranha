import { Router } from "express";
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getOrdersByUser
} from "../controllers/orderController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(verifyToken, addOrderItems);
router.route("/myorders").get(verifyToken, getOrdersByUser);
router.route("/:id").get(verifyToken, getOrderById);
router.route("/:id/pay").put(verifyToken, updateOrderToPaid);

export default router;
