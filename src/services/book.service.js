import Book from "../models/book.model.js";
import {
  createBookRepository,
  getAllBookRepository,
  updateBookRepository,
} from "../repository/book.repository.js";

//service to create boook
export const createBookService = async (bookData) => {
  return await createBookRepository(bookData);
};

//service to get all books
export const getAllBookService = async () => {
  return await getAllBookRepository();
};

//service to get books by id
export const getBookByIDService = async (id) => {
  return await getAllBookRepository(id);
};

//service to update book
export const updateBookService = async (id, body) => {
  return await updateBookRepository(id, body);
};

export const findByIdAndDeleteService = async (id) => {
  return await deleteBookRepository(id);
};
