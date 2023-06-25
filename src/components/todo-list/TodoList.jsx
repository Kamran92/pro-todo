import { useEffect, useRef } from "react";
import TodoListItem from "../todo-list-item/TodoListItem";
import dragAndDrop from "./utils/dragAndDrop";

import "./todo-list.css";

const TodoList = ({
  items,
  onItemAdd,
  onItemDelete,
  onItemChange,
  onItemMove,
}) => {
  const listRef = useRef(null);
  useEffect(() => {
    const dragAndDropList = dragAndDrop(listRef.current, {
      drop: onItemMove,
    });
    dragAndDropList.init();
    return () => {
      dragAndDropList.reset();
    };
  });
  return (
    <ul className="todo-list list-group" ref={listRef}>
      {items.children.map((item) => {
        return (
          <li
            className="list-group-item"
            key={item.id}
            data-draggable={""}
            data-child-index={item.id}
            data-parent-index={items.id}
          >
            <TodoListItem
              {...item}
              onItemAdd={onItemAdd}
              onItemDelete={onItemDelete}
              onItemChange={onItemChange}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
