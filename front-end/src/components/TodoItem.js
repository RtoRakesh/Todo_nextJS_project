export default function TodoItem({ todo, onDelete, onToggleStatus }) {
  return (
    <li>
      <h1>{todo.text}</h1>
      <button
        onClick={onToggleStatus(todo._id)}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.completed ? "undo" : "complete"}
      </button>
      <button onClick={onDelete(todo._id)}>Delete</button>
    </li>
  );
}
