import { Todo } from "../model/DB.js";

const getTodos = async (req, res) => {
  try {
    const data = await Todo.find({});
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataById = await Todo.findById(id);
    if (!dataById) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ data: dataById });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { name, date, content } = req.body;
    const createdTodo = await Todo.create({
      name: name,
      date: date,
      content: content,
    });
    return res.status(200).json({ data: createdTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, content } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        name: name,
        date: date,
        content: content,
      },
      { new: true, runValidators: true },
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ data: updatedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({
      message: "Todo deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getTodos, getTodosById, createTodo, updateTodo, deleteTodo };
