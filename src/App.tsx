import React, { FC, useEffect, useState } from "react";
import { Todos } from "./Interface";
import axios from 'axios';
import TodoForm from "./components/Form/Todoform";

import "./App.css";
import TodoList from "./components/List/Todolist";
// import {Todo} from "../todo_backend/src/todo/todo.entity";
// import {Todo} from "../todo_backend/src/todo/todo.entity";

const App: FC = () => {
  const [todoList, setTodoList] = useState<Todos[]>([]);
  const [theme, setTheme] = useState("light");

  async function getData() {
    const response =  await axios.get('http://localhost:3000/todos/get');
    const todos: Todos[] = await response.data;
    setTodoList(todos)
  }

  useEffect( () => {
    getData();
  })
  const addTodo = async (todo: string): Promise<void> => {
    if (!todo) {
      alert("Input field is empty");
      return;
    }
    const data: Todos = {
      id: todoList.length < 1 ? 1 : todoList[todoList.length - 1].id + 1,
      title: todo,
      completed: false,
    };
await axios.post('http://localhost:3000/todos/create', {
  title: data.title,
  completed: false
})
    await getData()
  };

  const completeTodo = (id: number): void => {
    setTodoList(
        todoList.map(
            (todo: Todos): Todos =>
                todo.id === id
                    ? Object.assign(todo, { completed: true }) && todo
                    : todo
        )
    );
    axios.put(`http://localhost:3000/todos/modify/${id}`, {completed: todoList[id].completed})
  };

  const changeTodo = (input: string, id: number) => {
    setTodoList(
      todoList.map((item) => (item.id === id ? { ...item, name: input } : item))
    );
  };

  const deleteTodo = (id: number): void => {
    setTodoList(
        todoList.filter(
            (todo: Todos): Todos | null => (todo.id !== id ? todo : null)
        )
    );
    axios.delete('http://localhost:3000/todos/delete/' + id)
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <div className="app">
        <h1 className="heading">Todo List</h1>
        <div className="checkbox-wrapper-54">
          <label className="switch">
            <input type="checkbox" onClick={toggleTheme} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="container">
          <TodoForm addTodo={addTodo} />
          <div className="todoList">
            {todoList.map((todo: Todos, key: number) => (
              <TodoList
                key={key}
                todo={todo}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                changeTodo={changeTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
