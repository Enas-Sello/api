import orderModel from "../models/order.model.js";
import gigModel from "../models/gig.model.js";
import { createError } from "../middleware/errorHandler.js";

// create order
export const createOrder = async (req, res, next) => {
  try {
    const gig = await gigModel.findById(req.params.id);
    const newOrder = new orderModel({
      gigID: gig._id,
      Image: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary",
    });
    await newOrder.save();
    res.status(200).send(newOrder);
  } catch (error) {
    next(error);
  }
};
// single Order
export const singleOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) next(createError("order not found", 401));
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};
// all Orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: false,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
