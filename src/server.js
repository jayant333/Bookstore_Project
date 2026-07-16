import "dotenv/config";
import { config } from "./config/config.js";
import express from "express";
import bookRoutes from "./routes/book.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { logger } from "./middleware/logger.middleware.js";
import { handleNotFound } from "./middleware/handlenotfound.middleware.js";

const app = express();
const PORT = config.port;

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

app.listen(PORT, () => {
  console.log(`sever runnig on http://localhost:${PORT}`);
});
