import express from "express";
import { addReview, getProductReviews } from "../controllers/reviewcontroller.js";
import authUser from '../middleware/auth.js'
const router = express.Router();

router.post("/", authUser, addReview); // Add review
router.get("/:productId", getProductReviews); // Get reviews for product

export default router;
