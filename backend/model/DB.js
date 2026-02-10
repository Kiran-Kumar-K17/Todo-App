// model/DB.js
import mongoose, { Schema } from "mongoose";

// SIMPLE Mongoose schema (no validation - Zod handles that)
const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Keep basic requirements if you want
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt, updatedAt
    versionKey: false, // Removes __v field
  },
);

// Export the model
export const Todo = mongoose.model("Todo", todoSchema);
