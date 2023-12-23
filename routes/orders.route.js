import express from "express";
import { createOrder, getOrders, singleOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create/:id", verifyToken, createOrder);
router.get("/:id", verifyToken, singleOrder);
export default router;
