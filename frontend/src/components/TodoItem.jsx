// components/TodoItem.jsx
const TodoItem = ({ todo, onDelete }) => {
  return (
    <li className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{todo.name}</h3>
        <p className="text-gray-600 text-sm">{todo.content}</p>
      </div>

      <button
        onClick={() => onDelete(todo._id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
