import { UserRepository } from "../repository/user.repository.js";
import { BookRepository } from "../repository/book.repository.js";

import { UserService } from "./user.service.js";
import { BookService } from "./book.service.js";

export const userService = new UserService(new UserRepository());

export const bookService = new BookService(new BookRepository());
