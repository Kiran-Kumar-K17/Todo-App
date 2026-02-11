// components/TodoItem.jsx
const TodoItem = ({ todo, onDelete, onEdit = () => {} }) => {
  return (
    <li className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{todo.name}</h3>
        <p className="text-gray-600 text-sm">{todo.content}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit?.(todo)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
