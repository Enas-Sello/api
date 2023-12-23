import { createError } from "../middleware/errorHandler.js"
import User from "../models/user.model.js"

// getUser
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      return next(createError( "User not found", 404));
    }
    res.status(200).send(user);
  } catch (error) {
    next(createError("User not found" , 404));
  }
};
// deleteUser
export const deleteUser = async ( req, res ,next) =>
{
  const user = await User.findById(req.params.id)
    if (user && req.userId !== user._id.toString()) {
      return next(createError("not allowed", 403))
    }
    if (!user){
      return next(createError("user not found", 403))
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("deleted.")
}
