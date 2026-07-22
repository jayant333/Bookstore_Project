import { AppError } from "../utils/AppError.js";

export const validateCreateBook = (req, res, next) => {
  const { title, author, price } = req.body;
  if (!title || !author || price === undefined) {
    return next(new AppError("Title , author and price are required", 400));
  }

  if (typeof title !== "string" || typeof author !== "string") {
    return next(new AppError("Title and Author must be a string", 400));
  }

  //or we can write it as !title.trim()
  if (title.trim() === "" || author.trim() === "") {
    return next(new AppError("Title and Author must not be empty", 400));
  }

  const bookPrice = Number(price);
  if (Number.isNaN(bookPrice)) {
    return next(new AppError("Price Must be a Number", 400));
  }

  if (bookPrice <= 0) {
    return next(new AppError("price must be greater than 0", 400));
  }
  return next();
};
