import { createError } from "../middleware/errorHandler.js";
import gigModel from "../models/gig.model.js";

// createGig
export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError("only seller can create gig", 403));
  const newGig = new gigModel({
    userId: req.userId,
    ...req.body,
  });
  try {
    const saveGig = await newGig.save();
    res.status(200).json(saveGig);
  } catch (error) {
    next(error);
  }
};
// getAllGigs
export const getAllGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q?.userId }),
    ...(q.category && { category: q?.category }),
    ...(q.search && { title: { $regex: q?.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  try {
    const gigs = await gigModel.find(filters).sort({ [q.sort]: -1 });

    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
// getGig
export const getGig = async (req, res, next) => {
  try {
    const gig = await gigModel.findById(req.params.id);
    if (!gig) next(createError("gig not found", 401));
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};
// deleteGig
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await gigModel.findById(req.params.id);
    if (!gig) next(createError("gig not found", 401));
    if (gig.userId !== req.userId)
      return next(createError("you can delete only your gigs", 403));
    await gigModel.findByIdAndDelete(req.params.id);
    res.status(200).send("gig has been deleted");
  } catch (error) {
    next(error);
  }
};
