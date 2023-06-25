import { useState } from "react";

import "./search-panel.css";

const SearchPanel = ({ onSearchChange = () => {} }) => {
  const [term, setTerm] = useState("");

  const onTermChange = ({ target }) => {
    setTerm(target.value);
    onSearchChange(target.value);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти"
      value={term}
      onChange={onTermChange}
    />
  );
};

export default SearchPanel;
