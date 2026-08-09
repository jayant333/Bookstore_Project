import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";
import {
  createBookService,
  findByIdAndDeleteService,
  getAllBookService,
  getBookByIDService,
  updateBookService,
} from "../services/book.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

export const getBooks = asyncHandler(async (req, res, next) => {
  const { documents, pagination } = await getAllBookService(req.query);

  res.status(200).json({
    success: true,
    pagination,
    data: documents,
  });
});

export const createBook = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const newBook = await createBookService(req.body);

  return res.status(201).json({
    success: true,
    message: "Books Added Successfully",
    data: newBook,
  });
});

//using req.param
export const bookByID = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const { id } = req.params;

  const book = await getBookByIDService(id);

  res.status(200).json({
    success: true,
    data: book,
  });
});

//updtaing a book using PUT method
export const updateBook = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;
  const body = req.body;

  const updatedBook = await updateBookService(id, body);

  if (!updatedBook) {
    throw new AppError("Book not Found", 400);
  }

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

//Using Patch
export const patchBook = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;
  const body = req.body;

  const updatedBook = await updateBookService(id, body);

  if (!updatedBook) {
    throw new AppError("Book not Found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

//Delete Function
export const deleteBook = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;

  const deletedBook = await findByIdAndDeleteService(id);

  if (!deletedBook) {
    throw new AppError("Book not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Book removed successfully",
    data: deletedBook,
  });
});
