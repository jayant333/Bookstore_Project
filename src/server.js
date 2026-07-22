import "dotenv/config";
import { config } from "./config/config.js";
import app from "./app.js";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`sever runnig on http://localhost:${PORT}`);
});
