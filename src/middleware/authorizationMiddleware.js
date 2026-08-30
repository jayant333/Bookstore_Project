import { AppError } from "../utils/AppError.js";

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("Access Denied", 403);
    }

    next();
  };
};
