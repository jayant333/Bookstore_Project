import { permissions } from "../config/permissions.js";
import { AppError } from "../utils/AppError.js";

export const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }
    const userPermission = permissions[req.user.role] || [];

    if (!userPermission.includes(requiredPermission)) {
      throw new AppError("Access Denied", 403);
    }

    next();
  };
};
