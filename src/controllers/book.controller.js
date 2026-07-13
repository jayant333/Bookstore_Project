import { books, authors } from "../data/data.js";

export const homePage = (req, res) => {
  res.send("Welcome to the Bookstore Api");
};

export const getBooks = (req, res) => {
  //console.log(req.query);
  const { author, search, sort } = req.query;
  let filteredBooks = [...books];
  if (author) {
    filteredBooks = books.filter(
      (book) => book.author.toLowerCase() === author.toLowerCase(),
    );
  }
  if (search) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }
  if (sort === "price") {
    filteredBooks.sort((a, b) => a.price - b.price);
  }

  if (sort === "title") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }
  return res.status(200).json({
    success: true,
    data: filteredBooks,
  });
};

export const createBook = (req, res) => {
  const { title, price, author } = req.body;

  if (!title || !author || !price == null) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    price,
    author,
  };
  console.log(newBook);

  books.push(newBook);

  return res.status(201).json({
    success: true,
    message: "Books Added Successfully",
    data: newBook,
  });
};

//using req.param
export const bookByID = (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === Number(id));
  console.log(id);
  res.json({
    success: true,
    data: book,
  });
};

export const getAuthors = (req, res) => {
  res.json(authors);
};

export const handleNotFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "404: Page not Found",
  });
};
