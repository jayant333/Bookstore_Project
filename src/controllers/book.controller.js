import { AppError } from "../utils/AppError.js";
import Book from "../models/book.model.js";
import mongoose from "mongoose";
import {
  createBookService,
  findByIdAndDeleteService,
  getAllBookService,
  getBookByIDService,
  updateBookService,
} from "../services/book.service.js";

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await getAllBookService();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    console.log(req.body);

    const newBook = await createBookService(req.body);

    return res.status(201).json({
      success: true,
      message: "Books Added Successfully",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

//using req.param
export const bookByID = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book ID", 400));
  }
  const { id } = req.params;

  try {
    const book = await getBookByIDService(id);
    if (!book) {
      return next(new AppError("Book not found", 404));
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

//updtaing a book using PUT method
export const updateBook = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book ID", 400));
  }
  const id = req.params.id;
  const body = req.body;

  try {
    const updatedBook = await updateBookService(id, body);

    if (!updatedBook) {
      return next(new AppError("Book not Found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

//Using Patch
export const patchBook = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book ID", 400));
  }
  const id = req.params.id;
  const body = req.body;

  try {
    const updatedBook = await updateBookService(id, body);

    if (!updatedBook) {
      return next(new AppError("Book not Found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Function
export const deleteBook = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book ID", 400));
  }
  const id = req.params.id;

  try {
    const deletedBook = await findByIdAndDeleteService(id);

    if (!deletedBook) {
      return next(new AppError("Book not found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Book removed successfully",
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
};
