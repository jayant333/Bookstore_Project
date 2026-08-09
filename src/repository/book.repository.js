import Book from "../models/book.model.js";
import { BaseRepository } from "./BaseRepository.js";

export class BookRepository extends BaseRepository {
  constructor() {
    super(Book);
  }
}
