"use client";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const baseUrl = "url";

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setTodo(data);
    }
    fetchTodos();
  }, []);

  async function addTodo() {
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: todo }),
      });
      const data = await res.json();
      setTodos(...todos, data);
      setTodo("");
    } catch (err) {
      throw new err();
    }
  }

  async function onDelete(id) {
    try {
      const res = await fetch(`${baseUrl}${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos(todos.filter(todo(todo_id !== id)));
      }
    } catch (err) {
      throw new err();
    }
  }

  async function onToggleStatus(id) {
    const editTodo = todos.find((todo) => todo._id === id);
    const updateTodo = { ...editTodo, completed: !editTodo.completed };
    try {
      const res = await fetch(`${baseUrl}${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !updateTodo.completed }),
      });

      if (res.ok) {
        setTodos(
          todos.map((todo) => (todo._id === id ? updateTodo : editTodo))
        );
      }
    } catch (err) {
      throw new err();
    }
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={todo}
        placeholder="Enter the Todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <TodoList
        todos={todos}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
}
