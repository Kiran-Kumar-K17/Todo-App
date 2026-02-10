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

router
  .route("/")
  .get(getTodos)
  .post(validate(createTodoSchema, "body"), createTodo);
router
  .route("/:id")
  .get(validate(idSchema, "params"), getTodosById)
  .patch(
    validate(idSchema, "params"),
    validate(updateTodoSchema, "body"),
    updateTodo,
  )
  .delete(validate(idSchema, "params"), deleteTodo)
  .put(
    validate(idSchema, "params"),
    validate(updateTodoSchema, "body"),
    updateTodo,
  );

export default router;
