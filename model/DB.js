import mongoose, { Schema } from "mongoose";

const todoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: [true, "content is required"],
    maxLength: [100, "100 is the Max Length"],
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
