const Test = () => {
  const debug = () => {
    console.log(localStorage.getItem("id"));
  };
  return (
    <div>
      <div>This is test page</div>
      <button onClick={debug}>Debug</button>
    </div>
  );
};

export default Test;
