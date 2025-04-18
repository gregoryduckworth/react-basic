import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Database unavailable" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
