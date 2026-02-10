import { Router } from "express";
import {
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todo.js";
const router = Router();

router.route("/").get(getTodos).post(createTodo);
router
  .route("/:id")
  .get(getTodosById)
  .patch(updateTodo)
  .delete(deleteTodo)
  .put(updateTodo);

export default router;
