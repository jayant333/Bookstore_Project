import { AppError } from "../utils/AppError.js";

export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  //service to create boook
  async createBookService(bookData) {
    return await this.bookRepository.create(bookData);
  }

  //service to get all books
  async getAllBookService(query) {
    return await this.bookRepository.findAll(query, ["title", "author"]);
  }

  //service to get books by id
  async getBookByIDService(id) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new AppError("Book not found", 404);
    }

    return book;
  }

  //service to update book
  async updateBookService(id, body) {
    const book = await this.bookRepository.updateById(id, body);

    if (!book) {
      throw new AppError("Book not found", 404);
    }
    return book;
  }

  async findByIdAndDeleteService(id) {
    const book = await this.bookRepository.deleteById(id);

    if (!book) {
      throw new AppError("Book Not Found", 404);
    }

    return book;
  }
}
