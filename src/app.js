import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import { handleNotFound } from "./middleware/handlenotfound.middleware.js";
import { logger } from "./middleware/logger.middleware.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();
app.use(express.json());
app.use(logger);
//will load every route
app.use("/books", bookRoutes);

//routes for future
// app.use("/authors", authorRoutes);
// app.use("/users", userRoutes);

//404 handler must be at last
app.use(handleNotFound);

//error handler
app.use(errorHandler);

export default app;
