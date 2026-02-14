import express from "express";
import connectDB from "./utils/MongoDB.js";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  }),
);
const startServer = async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.use("/todo", todoRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
