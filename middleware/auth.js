import jwt from "jsonwebtoken"
import { createError } from "./errorHandler.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (!token) return next(createError("not authenticated", 401))
  jwt.verify(token, process.env.JWT, async (err, payload) => {
    if (err) return next(createError("token is not valid", 403))
    req.userId = payload.id
    req.isSeller = payload.isSeller
    next()
  })
}
