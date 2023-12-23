import { createError } from "../middleware/errorHandler.js";
import Review from "../models/review.model.js";
import gigModel from "../models/gig.model.js";
import User from "../models/user.model.js";
import orderModel from "../models/order.model.js";

// createReview
export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError("seller can not crearte review", 403));
  }
  const NewReview = new Review({
    userId: req.userId,
    gigID: req.body.gigID,
    description: req.body.description,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigID: req.body.gigID,
      userId: req.userId,
    });
    const purchasedReview = await orderModel.findOne({
      gigID: req.body.gigID,
      userId: req.userId,
    });

    if (review) {
      return next(
        createError("you have already created review for this gig", 403)
      );
    }

    if (!purchasedReview) {
      return next(createError("you did not  purchased this gig", 403));
    }

    const saveReview = await NewReview.save();

    await gigModel.findOneAndUpdate(
      { _id: req.body.gigID },
      {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      }
    );

    res.status(201).send(saveReview);
  } catch (error) {
    next(error);
  }
};

// getReview
export const getReview = async (req, res, next) => {
  try {
    const allReviews = await Review.find({ gigID: req.params.id });
    res.status(201).send(allReviews);
  } catch (error) {
    next(error);
  }
};

// deleteReview
export const deleteReview = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const review = await Review.findById(req.params.gigId);
  try {
    if (user.isSeller) createError("sellers can not delete reviews ", 403);
    if (review && review.userId !== req.userId)
      createError("you can only delete your reviews ", 403);
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).send("done");
  } catch (error) {
    next(error);
  }
};
