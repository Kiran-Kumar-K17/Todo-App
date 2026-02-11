// components/TodoForm.jsx
import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) return;

    onAdd({ name: trimmedName, content: trimmedContent });

    setName("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <input
        type="text"
        aria-label="Task title"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        aria-label="Task description"
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
