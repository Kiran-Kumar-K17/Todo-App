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
      // Validate the specified target (body, params, or query)
      const validatedData = schema.parse(req[target]);

      // Replace the original data with validated data
      req[target] = validatedData;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod errors nicely
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }

      // Unexpected error
      return res.status(500).json({
        message: "Internal validation error",
      });
    }
  };
};
