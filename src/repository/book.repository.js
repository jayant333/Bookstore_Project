import Book from "../models/book.model";

//creates book
export const createBookRepository = async (bookData) => {
  return await Book.create(bookData);
};

//get all book
export const getAllBookRepository = async () => {
  return await Book.find();
};

//finds book by id
export const getBookByIDRepository = async (id) => {
  return await Book.findById(id);
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
