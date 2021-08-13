import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoLogo from "../Assets/todo.svg";
import { TodoList } from "../Types/Types";
function Todo() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoItemList, setTodoItemList] = useState<TodoList[]>([]);
  const [todoList, setTodoList] = useState<boolean>(false);
  const handleAdd = () => {
    if (todoInput === "") {
      alert("Fill the field");
    } else {
      const allTodoItems = {
        id: new Date().getTime().toString(),
        name: todoInput,
      };
      setTodoItemList([...todoItemList, allTodoItems]);
      setTodoInput("");
      setTodoList(true);
    }
  };
  const delTodo = (id: string) => {
    const todoListUpdated = todoItemList.filter((item) => {
      return item.id !== id;
    });
    setTodoItemList(todoListUpdated);
  };
  const removeAll = () => {
    setTodoItemList([]);
    setTodoList(false);
  };
  useEffect(() => {
    if (todoItemList.length === 0) {
      setTodoList(false);
    }
  }, [todoItemList]);
  return (
    <div className="todo__container">
      {/* <img src={TodoLogo} alt="Todo App" className="todo__badge" /> */}
      <div className="header__todo__container">
        <h2 className="header__heading">React Todo Application📝</h2>
        <button>Sign In</button>
      </div>
      <div className="todo__input__div">
        <input
          type="text"
          placeholder="✍ Enter your task Todo"
          className="todo__input"
          value={todoInput}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoInput(e.target.value)
          }
        />
        <i className="fa fa-plus add__todo" onClick={handleAdd}></i>
      </div>
      <div className="todo__body">
        {todoItemList.map((item) => {
          return (
            <div className="todo__item__div" key={item.id}>
              <h3 className="todo__task__name">{item.name}</h3>
              <div className="todo__task__icons">
                <i className="far fa-edit todo__task__edit"></i>
                <i
                  className="far fa-trash-alt todo__task__del"
                  onClick={() => delTodo(item.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {todoList ? (
        <div className="todo__footer">
          <button className="button__remove__all" onClick={removeAll}>
            Remove All <i className="far fa-trash-alt todo__task__del"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Todo;
