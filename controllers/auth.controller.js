import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../middleware/errorHandler.js"
// register
export const register = async (req, res, next) => {
  try {
    const hasaPass = bcrypt.hashSync(req.body.password, 5)
    const newUser = new User({
      ...req.body,
      password: hasaPass,
    })
    await newUser.save()
    res.status(201).send("done")
  } catch (error) {
    next(error)
  }
}

// login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) return next(createError("user not found", 404))
    const userPass = bcrypt.compareSync(req.body.password, user.password)
    if (!userPass) return next(createError("wrong username or password", 400))
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT
    )
    const { password, ...info } = user._doc
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info)
  } catch (error) {
    next(error)
  }
}

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {}).status(200).send("user has been logOut")
  } catch (error) {
    next(error)
  }
}
