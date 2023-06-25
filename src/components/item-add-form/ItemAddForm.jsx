import classNames from "classnames";
import { useState } from "react";

import "./item-add-form.css";

const ItemAddForm = ({
  onItemAdded = () => {},
  label = "",
  placeholder = "Что нужно сделать?",
  children,
  className,
}) => {
  const [value, setValue] = useState(() => label);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimValue = value.trim();
    if (!trimValue) return;
    onItemAdded(trimValue);
    setValue("");
  };

  return (
    <form
      className={classNames("bottom-panel d-flex", className)}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        className="form-control new-todo-label"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={placeholder}
        autoFocus
      />
      {children}
    </form>
  );
};

export default ItemAddForm;
