"use client";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const baseUrl = "https://todo-nextjs-project-1.onrender.com";

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${baseUrl}/api/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    }
    fetchTodos();
  }, []);

  async function addTodo() {
    try {
      const res = await fetch(`${baseUrl}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: todo }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const data = await res.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      setTodo("");
      console.log("Added todo:", data);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }

  async function onDelete(id) {
    try {
      const res = await fetch(`${baseUrl}/api/todos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

  async function onToggleStatus(id) {
    const editTodo = todos.find((todo) => todo._id === id);
    const updateTodo = { ...editTodo, completed: !editTodo.completed };

    try {
      const res = await fetch(`${baseUrl}/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: updateTodo.completed }),
      });

      if (res.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? updateTodo : todo))
        );
      } else {
        console.error("Failed to update todo status");
      }
    } catch (err) {
      console.error("Error updating todo status:", err);
    }
  }

  return (
    <div className={styles.container}>
      <h1 style={{ color: "black" }}>Todo App</h1>
      <div className={styles.inputContainer}>
        <input
          value={todo}
          placeholder="Enter the Todo"
          onChange={(e) => setTodo(e.target.value)}
          className={styles.todoInput}
        />
        <button className={styles.addButton} onClick={addTodo}>
          Add
        </button>
      </div>
      <TodoList
        todos={todos}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
}
