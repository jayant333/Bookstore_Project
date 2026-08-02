import { AppError } from "../utils/AppError.js";
import Book from "../models/book.model.js";

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

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
export const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return (
      res.status(404),
      json({
        success: false,
        message: "Book not found",
      })
    );
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.price = req.body.price;

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
export const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index < 0) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  const updatedBooks = books.toSpliced(index, 1);

  return res.status(200).json({
    success: true,
    message: "Book removed successfully",
    data: updatedBooks,
  });
};

// export const getAuthors = (req, res) => {
//   res.json(authors);
// };
