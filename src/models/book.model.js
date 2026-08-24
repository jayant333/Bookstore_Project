import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "price cannot be negative"],
    },
    genre: {
      type: String,
      enum: [
        "Programming",
        "Novel",
        "History",
        "Science",
        "Biography",
        "Finance",
      ],
      required: [true, "Genre is required"],

      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "stock cannot be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
