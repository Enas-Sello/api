import express from "express";
import {
  createReview,
  getReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/:id", verifyToken, getReview);
router.delete("/delete/:id", verifyToken, deleteReview);
export default router;
