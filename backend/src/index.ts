import express from "express";
import cors from "cors";
import * as routes from "./routes";
import prisma from "./services/db";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(routes.healthRoute);
app.use(routes.rootRoute);

app.use(errorHandler);

// Graceful shutdown
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  console.log("Shutting down server...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
