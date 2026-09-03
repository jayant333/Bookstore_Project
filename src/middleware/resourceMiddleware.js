import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler.js";

export const loadBook = (bookService) => {
  asyncHandler(async (req, res, next) => {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      throw new AppError("Book not found", 404);
    }

    req.resource = book;

    next();
  });
};
