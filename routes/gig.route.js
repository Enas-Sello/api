import express from "express"
import {
  createGig,
  getAllGigs,
  getGig,
  deleteGig,
} from "../controllers/gig.controller.js"
import { verifyToken } from "../middleware/auth.js"
const router = express.Router()

router.post("/create", verifyToken, createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/allGigs", getAllGigs)
router.get("/single/:id", getGig)
export default router
