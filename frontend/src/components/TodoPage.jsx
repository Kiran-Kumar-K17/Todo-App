import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/todo`, {
          signal: controller.signal,
        });
        setData(result.data.data);
      } catch (error) {
        if (error.name === "AbortError" || axios.isCancel(error)) {
          return;
        }
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const res = await axios.post(`/api/todo`, newTodo);
      setData([...data, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      setData(data.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const res = await axios.put(`/api/todo/${id}`, updatedTodo);
      setData((prev) =>
        prev.map((todo) => (todo._id === id ? res.data.data : todo)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Todo List Web-App
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <TodoForm
          onAdd={handleAddTodo}
          onUpdate={handleUpdateTodo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
        />
        <TodoList
          todos={data}
          onDelete={handleDeleteTodo}
          onEdit={setEditingTodo}
        />
      </div>
    </div>
  );
};

export default TodoPage;
