const filterButtons = [
  { name: "all", label: "Все" },
  { name: "active", label: "Надо сделать" },
  { name: "done", label: "Сделанные" },
];

const ItemStatusFilter = ({ filter, onFilterChange = () => {} }) => {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames =
      "btn " + (isActive ? "btn-info" : "btn-outline-secondary");

    return (
      <button
        key={name}
        type="button"
        onClick={() => onFilterChange(name)}
        className={classNames}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default ItemStatusFilter;
