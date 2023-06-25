export default (...fns) => {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
};
