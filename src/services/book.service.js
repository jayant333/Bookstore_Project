import { BookRepository } from "../repository/book.repository.js";
import { AppError } from "../utils/AppError.js";

const bookRepository = new BookRepository();

//service to create boook
export const createBookService = async (bookData) => {
  return await bookRepository.create(bookData);
};

//service to get all books
export const getAllBookService = (query) => {
  return bookRepository.findAll(query, ["title", "author"]);
};

//service to get books by id
export const getBookByIDService = async (id) => {
  const book = await bookRepository.findById(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return book;
};

//service to update book
export const updateBookService = async (id, body) => {
  return await bookRepository.updateById(id, body);
};

export const findByIdAndDeleteService = async (id) => {
  return await bookRepository.deleteById(id);
};
