import { AppError } from "../utils/AppError.js";
import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
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

    const newBook = await Book.create(req.body);

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
    const book = await Book.findById(id);
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
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true /*Return the updated document*/,
      runValidators: true /**Mongoose checks the schema before saving the update, preventing invalid data */,
    });

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

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
};

//Using Patch
export const patchBook = (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      success: true,
      message: "Book not found",
    });
  }
  // if (req.body.title) {
  //   book.title = req.body.title;
  // }
  // if (req.body.author) {
  //   book.author = req.body.author;
  // }
  // if (req.body.price) {
  //   book.price = req.body.price;
  //   }

  //using Object.assign()
  Object.assign(book, req.body);

  return res.status(200).json({
    success: true,
    message: "Patch update sucessful",
    data: book,
  });
};

//Delete Function
export const deleteBook = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid book ID", 400));
  }
  const id = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

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

// export const getAuthors = (req, res) => {
//   res.json(authors);
// };

//old code to get books
// export const getBooks = async (req, res, next) => {
//   //console.log(req.query);
//   const { author, search, sort } = req.query;
//   let filteredBooks = [...books];
//   if (author) {
//     filteredBooks = books.filter(
//       (book) => book.author.toLowerCase() === author.toLowerCase(),
//     );
//   }
//   if (search) {
//     filteredBooks = filteredBooks.filter((book) =>
//       book.title.toLocaleLowerCase().includes(search.toLowerCase()),
//     );
//   }
//   if (sort === "price") {
//     filteredBooks.sort((a, b) => a.price - b.price);
//   }

//   if (sort === "title") {
//     filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
//   }
//   return res.status(200).json({
//     success: true,
//     data: filteredBooks,
//   });
// };
