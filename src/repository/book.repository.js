import Book from "../models/book.model.js";

//creates book
export const createBookRepository = async (bookData) => {
  return await Book.create(bookData);
};

//get all book
export const getAllBookRepository = async ({ page, limit, query }) => {
  const skip = (page - 1) * limit;
  console.log(query, "<<<<<<<");

  //filtering books
  const filter = {}; //monogbd automatically filters
  if (query.author) {
    filter.author = query.author;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i", //i means case-insensitive
    };
  }

  let mongoQuery = Book.find(filter);

  if (query.sort) {
    mongoQuery = mongoQuery.sort(query.sort);
  }

  if (query.fields) {
    mongoQuery = mongoQuery.select(query.fields.replaceAll(",", " "));
  }
  return await mongoQuery.skip(skip).limit(limit);
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
