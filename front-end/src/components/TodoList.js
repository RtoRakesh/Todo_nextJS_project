import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onToggleStatus }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}
