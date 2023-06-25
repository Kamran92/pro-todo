import { useMemo, useState } from "react";

import AppHeader from "../app-header/AppHeader";
import TodoList from "../todo-list/TodoList";
import SearchPanel from "../search-panel/SearchPanel";
import ItemStatusFilter from "../item-status-filter/ItemStatusFilter";
import ItemAddForm from "../item-add-form/ItemAddForm";

import "./app.css";
import uuid from "./utils/uuidv4";
import pipe from "./utils/pipe";
import {
  insert,
  remove,
  find,
  move,
  preOrderTraversal,
} from "./utils/treeActions";

const createItem = (parenId, id, label) => {
  return {
    parenId,
    id,
    label,
    done: false,
    children: [],
  };
};

const App = () => {
  const [items, setItems] = useState({
    id: "root",
    children: [createItem("root", "1", "1"), createItem("root", "2", "2")],
  });

  const [status, setStatus] = useState("all");

  const [search, setSearch] = useState("");

  const filterSearch = (items, search) => {
    const result = [];

    for (const item of items) {
      const children = filterSearch(item.children, search);
      const isFind =
        item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;

      if (!isFind) result.push(...children);

      if (isFind) {
        item.children = children;
        result.push(item);
      }
    }

    return result;
  };

  const filterStatus = (items, status) => {
    if (status === "all") return items;

    const statuses = { active: false, done: true };

    const result = [];

    for (const item of items) {
      const children = filterStatus(item.children, status);
      const isFind = item.done === statuses[status];

      if (!isFind) result.push(...children);

      if (isFind) {
        item.children = children;
        result.push(item);
      }
    }

    return result;
  };

  const filteredItems = useMemo(() => {
    return pipe(
      (items) => JSON.parse(JSON.stringify(items)),
      (items) => filterSearch(items, search),
      (items) => filterStatus(items, status),
      (items) => ({ id: "root", children: items })
    )(items.children);
  }, [items, status, search]);

  const count = useMemo(() => {
    let done = 0;
    let todo = 0;

    for (let node of preOrderTraversal(items)) {
      if (node.done === true) done++;
      if (node.done === false) todo++;
    }
    return { done, todo };
  }, [items]);

  const onItemDelete = (id) => {
    const newItems = remove({ ...items }, id);
    setItems(newItems);
  };

  const onItemAdd = (parenId, value) => {
    const newItems = insert(
      { ...items },
      parenId,
      createItem(parenId, uuid(), value),
      "middle"
    );
    setItems(newItems);
  };

  const onItemChange = (id, key, value) => {
    const newItems = { ...items };
    const item = find(newItems, id);
    item[key] = value;
    setItems(newItems);
  };

  const onItemMove = (position, parenNodeId, dropNodeId, childNodeId) => {
    console.log({ parenNodeId, dropNodeId, position, childNodeId });
    const newItems = { ...items };
    const item = find(newItems, dropNodeId);
    remove(newItems, dropNodeId);
    const result = move(newItems, parenNodeId, item, position, childNodeId);
    setItems(result);
  };

  return (
    <div className="todo-app">
      <AppHeader count={count} />

      <div className="search-panel d-flex">
        <SearchPanel onSearchChange={setSearch} />

        <ItemStatusFilter filter={status} onFilterChange={setStatus} />
      </div>

      <TodoList
        items={filteredItems}
        onItemAdd={onItemAdd}
        onItemDelete={onItemDelete}
        onItemChange={onItemChange}
        onItemMove={onItemMove}
      />

      <ItemAddForm
        onItemAdded={(value) => onItemAdd("root", value)}
        className="todo-app__item-add-form"
      >
        <button type="submit" className="btn btn-outline-secondary">
          Добавить
        </button>
      </ItemAddForm>
    </div>
  );
};
export default App;
