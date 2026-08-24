import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    err = new AppError("Email already exists", 400);
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
};
