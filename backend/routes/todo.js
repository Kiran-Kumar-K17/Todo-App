import { Router } from "express";
import {
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todo.js";
import {
  createTodoSchema,
  updateTodoSchema,
  idSchema,
} from "../schemas/todoSchemas.js";
import { validate } from "../middleware/validate.js";

const router = Router();

// Get all todos - MUST come before /:id routes
router.get("/", getTodos);

// Create a new todo
router.post("/", validate(createTodoSchema, "body"), createTodo);

// Get todo by ID
router.get("/:id", validate(idSchema, "params"), getTodosById);

// Update todo (PUT)
router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updateTodoSchema, "body"),
  updateTodo,
);

// Update todo (PATCH)
router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateTodoSchema, "body"),
  updateTodo,
);

// Delete todo
router.delete("/:id", validate(idSchema, "params"), deleteTodo);

export default router;
