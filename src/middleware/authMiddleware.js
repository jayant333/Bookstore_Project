import jwt, { decode } from "jsonwebtoken";
import { config } from "../config/config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createProtect = (userService) =>
  asyncHandler(async (req, res, next) => {
    const authorization = req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await userService.getUserById(decoded.id);
      req.user = user;

      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Invalid or expired token", 401);
    }
  });
