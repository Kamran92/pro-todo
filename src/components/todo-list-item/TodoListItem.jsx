import classNames from "classnames";
import { useState } from "react";
import ItemAddForm from "../item-add-form/ItemAddForm";
import "./todo-list-item.css";

import TodoListItemRec from "../todo-list-item/TodoListItem";

const TodoListItem = ({
  important,
  done,
  label,
  children,
  id,
  onItemChange,
  onItemDelete,
  onItemAdd,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showAddFrom, setShowAddForm] = useState(false);

  const toggleParentElemDraggable = (e) => {
    const dragElement = e.target.closest("[data-draggable]");
    dragElement.draggable === true
      ? dragElement.removeAttribute("draggable")
      : (dragElement.draggable = true);
  };
  if (showAddFrom)
    return (
      <ItemAddForm
        onItemAdded={(label) => {
          onItemAdd(id, label);
          setShowAddForm(false);
        }}
      >
        <button
          type="submit"
          className="btn btn-outline-success btn-sm float-right"
        >
          Добавить
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => setShowAddForm(false)}
        >
          Отменить
        </button>
      </ItemAddForm>
    );

  if (showEditor)
    return (
      <ItemAddForm
        label={label}
        onItemAdded={(label) => {
          onItemChange(id, "label", label);
          setShowEditor(false);
        }}
      >
        <button
          type="submit"
          className="btn btn-outline-success btn-sm float-right"
        >
          Изменить
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => setShowEditor(false)}
        >
          Отменить
        </button>
      </ItemAddForm>
    );

  return (
    <>
      <div
        className={classNames("todo-list-item", { important, done })}
        data-content={""}
      >
        <button
          onMouseDown={toggleParentElemDraggable}
          onMouseUp={toggleParentElemDraggable}
          type="button"
          className="btn btn-outline-success btn-sm"
        >
          <i className="fa fa-ellipsis-v"></i>
        </button>
        <span className="todo-list-item-label">{label}</span>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => onItemDelete(id)}
        >
          <i className="fa fa-trash-o"></i>
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fa fa-plus"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => setShowEditor(true)}
        >
          <i className="fa fa-pencil"></i>
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => onItemChange(id, "done", !done)}
        >
          <i
            className={classNames("fa", {
              "fa-check": !done,
              "fa-times": done,
            })}
          ></i>
        </button>
      </div>
      {children.length > 0 && (
        <ul className="todo-list list-group" style={{ marginTop: "15px" }}>
          {children.map((item) => {
            return (
              <li
                key={item.id}
                className="list-group-item"
                data-draggable={""}
                data-child-index={item.id}
                data-parent-index={id}
              >
                <TodoListItemRec
                  {...item}
                  onItemAdd={onItemAdd}
                  onItemDelete={onItemDelete}
                  onItemChange={onItemChange}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default TodoListItem;
