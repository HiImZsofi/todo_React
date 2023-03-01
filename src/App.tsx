import React, { FC, useEffect, useState } from "react";
import { Todos } from "./Interface";

import TodoForm from "./components/Form/Todoform";

import "./App.css";
import TodoList from "./components/List/Todolist";

const App: FC = () => {
  const [todoList, setTodoList] = useState<Todos[]>([]);
  const [theme, setTheme] = useState("light");

  const addTodo = (todo: string): void => {
    if (!todo) {
      alert("Input field is empty");
      return;
    }
    const data: Todos = {
      id: todoList.length < 1 ? 1 : todoList[todoList.length - 1].id + 1, //mindig az utolsó id legyen
      todo: todo,
      completed: false,
    };
    setTodoList([...todoList, data]);
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
  };

  const changeTodo = (input: string, id: number) => {
    setTodoList(
      todoList.map((item) => (item.id === id ? { ...item, todo: input } : item))
    );
  };

  const deleteTodo = (id: number): void => {
    setTodoList(
      todoList.filter(
        (todo: Todos): Todos | null => (todo.id !== id ? todo : null) //nem tudom az előzőben hol volt a hiba
      )
    );
  };

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
