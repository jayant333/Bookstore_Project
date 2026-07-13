import express from "express";
import {
  bookByID,
  createBook,
  getBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

//to get all books
router.get("/", getBooks);
//to create a new book
router.post("/", createBook);
//for book by id
router.get("/:id", bookByID);

export default router;

//routes for future will be make a separate route and controller file for them
// router.get("/authors", getAuthors);
// router.get("/", homePage);
