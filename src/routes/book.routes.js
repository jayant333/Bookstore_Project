import express from "express";
import {
  bookByID,
  createBook,
  deleteBook,
  getBooks,
  patchBook,
  updateBook,
} from "../controllers/book.controller.js";
import { validate } from "../middleware/validate.js";
import { createBookSchema } from "../schemas/book.schema.js";
import { createProtect } from "../middleware/authMiddleware.js";
import { userService } from "../services/index.js";
import { authorize } from "../middleware/authorizationMiddleware.js";
import { authorizePermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();
//protect middleware
const protect = createProtect(userService);

//to get all books
router.get("/", protect, authorizePermission("book:read"), getBooks);
//to create a new book
router.post(
  "/",
  protect,
  authorize("admin"),
  authorizePermission("book:create"),
  validate(createBookSchema),
  createBook,
);
//for book by id
router.get("/:id", protect, authorizePermission("book:read"), bookByID);
//put:  changing the whole data
router.put(
  "/:id",
  protect,
  authorize("user", "admin"),
  authorizePermission("book:update"),
  updateBook,
);
//patch:only updating a part
router.patch("/:id", protect, authorize("admin"), patchBook);
//Delete Method
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  authorizePermission("book:delete"),
  deleteBook,
);

export default router;

//routes for future will be make a separate route and controller file for them
// router.get("/authors", getAuthors);
// router.get("/", homePage);
