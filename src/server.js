import "dotenv/config";
import { config } from "./config/config.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = config.port;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`sever runnig on http://localhost:${PORT}`);
  });
};

startServer();
