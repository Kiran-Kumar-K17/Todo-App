import express from "express";
import connectDB from "./utils/MongoDB.js";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
const startServer = async () => {
  try {
    await connectDB();
    console.log("Server is running on port 8000");
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

app.listen(8000, () => {
  console.log("Server is Running");
});
