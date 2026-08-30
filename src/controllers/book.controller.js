import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BookRepository } from "../repository/book.repository.js";
import { BookService } from "../services/book.service.js";

const bookService = new BookService(new BookRepository());

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

export const getBooks = asyncHandler(async (req, res) => {
  const result = await bookService.getAllBookService(req.query);
  console.log("Controller reached");
  res.status(200).json({
    success: true,
    pagination: result.pagination,
    data: result.documents,
  });
});

export const createBook = asyncHandler(async (req, res) => {
  const newBook = await bookService.createBookService(req.body);

  return res.status(201).json({
    success: true,
    message: "Books Added Successfully",
    data: newBook,
  });
});

//using req.param
export const bookByID = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const { id } = req.params;

  const book = await bookService.getBookByIDService(id);

  res.status(200).json({
    success: true,
    data: book,
  });
});

//updtaing a book using PUT method
export const updateBook = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;
  const body = req.body;

  const updatedBook = await bookService.updateBookService(id, body);

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

//Using Patch
export const patchBook = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;
  const body = req.body;

  const updatedBook = await bookService.updateBookService(id, body);

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBook,
  });
});

//Delete Function
export const deleteBook = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new AppError("Invalid book ID", 400);
  }
  const id = req.params.id;

  const deletedBook = await bookService.findByIdAndDeleteService(id);

  return res.status(200).json({
    success: true,
    message: "Book removed successfully",
    data: deletedBook,
  });
});
