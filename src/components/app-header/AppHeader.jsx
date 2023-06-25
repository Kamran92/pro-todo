import "./app-header.css";

const AppHeader = ({ count }) => {
  return (
    <div className="app-header">
      <h1>Список задач</h1>
      <h2>
        {count.todo} нужно сделать, {count.done} сделано
      </h2>
    </div>
  );
};

export default AppHeader;
