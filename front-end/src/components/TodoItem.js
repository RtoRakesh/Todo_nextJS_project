import styles from "../app/page.module.css";

export default function TodoItem({ todo, onDelete, onToggleStatus }) {
  return (
    <li className={styles.todoItem}>
      <span
        className={`${styles.todoText} ${
          todo.completed ? styles.completed : ""
        }`}
      >
        {todo.text}
      </span>
      <div className={styles.actionButtons}>
        <button
          onClick={() => onToggleStatus(todo._id)}
          className={`${styles.actionButton} ${styles.completeButton}`}
        >
          {todo.completed ? "undo" : "complete"}
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
