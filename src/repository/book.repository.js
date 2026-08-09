import { APIFeatures } from "../features/APIFeatures.js";
import Book from "../models/book.model.js";

//creates book
export const createBookRepository = async (bookData) => {
  return await Book.create(bookData);
};

//get all book
export const getAllBookRepository = async (query) => {
  const features = new APIFeatures(Book.find(), query, ["title", "author"])
    .filter()
    .search()
    .sort()
    .limitFields()
    .pagination();

  return await features.query;
};

//to update book
export const updateBookRepository = async (id, body) => {
  return await Book.findByIdAndUpdate(id, body, {
    new: true /*Return the updated document*/,
    runValidators: true /**Mongoose checks the schema before saving the update, preventing invalid data */,
  });
};

export const deleteBookRepository = async (id) => {
  return await Book.findByIdAndDelete(id);
};
