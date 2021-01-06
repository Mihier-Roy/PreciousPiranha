import { Router } from "express";
import { getProducts, getProductsByID } from "../controllers/productController.js";

const router = Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductsByID);

export default router;
