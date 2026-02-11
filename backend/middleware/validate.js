// middleware/validate.js
import { z } from "zod";

/**
 * Generic Zod validation middleware
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {'body' | 'params' | 'query'} target - What to validate (body, params, query)
 */
export const validate = (schema, target = "body") => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req[target]);
      req[target] = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      return res.status(500).json({
        message: "Internal validation error",
      });
    }
  };
};
