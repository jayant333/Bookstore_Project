import express from "express";
import bookRoutes from "./routes/book.routes.js";
import { handleNotFound } from "./controllers/book.controller.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
//will load every route
app.use("/books", bookRoutes);

//routes for future
// app.use("/authors", authorRoutes);
// app.use("/users", userRoutes);

//404 handler must be at last
app.use(handleNotFound);

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
