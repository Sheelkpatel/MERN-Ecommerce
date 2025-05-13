import reviewModel from "../models/review_model.js";

// Add new review
export const addReview = async (req, res) => {
  try {
    const { productId, review } = req.body;
    const userId = req.user.id;

    if (!review || !productId) return res.status(400).json({ error: "Review and productId are required." });

    const newReview = new reviewModel({ productId, userId, review });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews by product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel.find({ productId }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
