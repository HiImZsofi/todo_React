import React, { FC, MouseEventHandler, useState } from "react"; //az FC már nem couraged de itt még működik (makes sure the signature of our function is correct and the return value is valid JSX)
import { Todos } from "../../Interface";
import "./Todolist.css";

interface Props {
  todo: Todos;
  key: number; //követi hogy melyik item változott és melyik nem
  completeTodo(id: number): void;
  deleteTodo: (id: number) => void;
  changeTodo(input: string, id: number): void;
}

const TodoList: FC<Props> = ({
  todo,
  key,
  completeTodo,
  deleteTodo,
  changeTodo,
}) => {
  const todoComplete = (): void => {
    if (!todo.completed) {
      completeTodo(todo.id);
    }
  };

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(" ");

  const getInputValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const todoDelete = (): void => {
    deleteTodo(todo.id);
  };

  const handleEditing = () => {
    setEditing(true);
  };

  return (
    <div key={key} className="todo">
      <button type="button" onClick={handleEditing}>
        Edit
      </button>
      <h1
        onClick={todoComplete}
        style={
          todo.completed ? { pointerEvents: "none" } : { cursor: "pointer" }
        }
      >
        {todo.completed ? (
          <span style={{ textDecorationLine: "line-through" }}>
            {todo.todo}
          </span>
        ) : editing ? (
          <form method="GET" onSubmit={() => changeTodo(inputValue, todo.id)}>
            <input
              placeholder="Editing current item"
              value={inputValue}
              onChange={getInputValue}
            ></input>
          </form>
        ) : (
          todo.todo
        )}
      </h1>
      {todo.completed ? (
        <button type="button" onClick={todoDelete}>
          Delete
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TodoList;
