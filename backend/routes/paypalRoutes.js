import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.send(process.env.PAYPAL_CLIENTID));

export default router;
