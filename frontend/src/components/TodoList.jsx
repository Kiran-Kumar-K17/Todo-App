// components/TodoList.jsx
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onEdit }) => {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-gray-500">No todos yet</p>;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
