// schemas/todoSchemas.js
import { z } from "zod";

const baseTodoSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),

    content: z
      .string()
      .min(1, "Content is required")
      .max(100, "Content cannot exceed 100 characters")
      .trim(),

    date: z.coerce.date().optional(),
  })
  .strict();

export const todoSchema = baseTodoSchema;
export const createTodoSchema = baseTodoSchema.extend({
  date: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
});
export const updateTodoSchema = baseTodoSchema.partial();

export const idSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID format"),
});
