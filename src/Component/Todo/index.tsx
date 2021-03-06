import React, { useState, useEffect } from "react";
import "./style.css";
import { TodoList } from "../../Types/Types";
import LoginModal from "../Login";
import Button from "@mui/material/Button";

function Todo() {
  const [todoInput, setTodoInput] = useState("");
  const [todoItemList, setTodoItemList] = useState<TodoList[]>([]);
  const [todoList, setTodoList] = useState<Boolean>(false);
  const [showToggleBtn, setShowToggleBtn] = useState<Boolean>(false);
  const [isEdit, setIsEdit] = useState<String>("");
  const [account, setAccount] = useState<Object>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const handleAdd = () => {
    if (!todoInput) {
      alert("Fill the field");
    } else {
      const allTodoItems = {
        id: new Date().getTime().toString(),
        name: todoInput,
      };
      setTodoItemList([...todoItemList, allTodoItems]);
      setTodoInput("");
      setShowToggleBtn(false);
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
  };

  const handleEdit = (id: string) => {
    todoItemList.filter((item) => {
      if (item.id === id) {
        setTodoInput(item.name);
        setIsEdit(item.id);
      }
    });
    setShowToggleBtn(true);
  };

  const handleToggleEdit = () => {
    if (!todoInput) {
      alert("Fill the field");
    } else if (todoInput !== "") {
      setTodoItemList(
        todoItemList.map((item) => {
          if (item.id === isEdit) {
            return { ...item, name: todoInput };
          }
          setTodoInput("");
          setShowToggleBtn(false);
          return item;
        })
      );
    }
    setTodoInput("");
    setShowToggleBtn(false);
  };

  useEffect(() => {
    if (todoItemList.length === 0) {
      setTodoList(false);
    } else {
      setTodoList(true);
    }
  }, [todoItemList]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="todo__container">
      <div className="header__todo__container">
        <h2 className="header__heading">React Todo Application????</h2>
        {Object.keys(account).length > 0 ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <div className="account__header">
            <LoginModal FormName="Sign up" />
            <hr />
            <LoginModal FormName="Login" />
          </div>
        )}
      </div>
      <div className="todo__input__div">
        <input
          type="text"
          placeholder="??? Enter your task Todo"
          className="todo__input"
          value={todoInput}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoInput(e.target.value)
          }
        />

        {showToggleBtn ? (
          <i
            className="far fa-edit add__todo toggle__edit"
            onClick={handleToggleEdit}
            title="Edit Todo"
          ></i>
        ) : (
          <i
            className="fa fa-plus add__todo"
            onClick={handleAdd}
            title="Add Todo"
          ></i>
        )}
      </div>
      <div className="todo__body">
        {todoItemList.map((item) => {
          return (
            <div className="todo__item__div" key={item.id}>
              <h3 className="todo__task__name">{item.name}</h3>
              <div className="todo__task__icons">
                <i
                  className="far fa-edit todo__task__edit"
                  title="Edit Todo"
                  onClick={() => handleEdit(item.id)}
                ></i>
                <i
                  className="far fa-trash-alt todo__task__del"
                  onClick={() => delTodo(item.id)}
                  title="Delete Todo"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {todoList ? (
        <div className="todo__footer">
          <button
            className="button__remove__all"
            onClick={removeAll}
            title="Remove All"
          >
            Remove All <i className="far fa-trash-alt todo__task__del"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Todo;
