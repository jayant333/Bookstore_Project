import { plugin } from "mongoose";
import { AppError } from "../utils/AppError";

export const authorizePolicy = (policy) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Authentication required ", 401);
    }

    const allowed = policy(req.user.req.resource);

    if (!allowed) {
      throw new AppError("Access Denied", 403);
    }

    next();
  };
};
