import TodoItem from "./TodoItem";
import styles from "../app/page.module.css";

export default function TodoList({ todos, onDelete, onToggleStatus }) {
  if (!todos || todos.length === 0) {
    return <p style={{ color: "black" }}>No todos available.</p>;
  }

  return (
    <ul className={styles.todoList}>
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
