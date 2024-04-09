import React, { useEffect } from "react";
import * as utils from "@/utils/utils";

const index = () => {
  var name: string | null = "";
  if (utils.checkLocalStorage()) {
    name = localStorage.getItem("name");
  }
  useEffect(() => {
    console.log(name);
  }, []);

  const setLocalStorage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem("name", "test");
  };

  const clearLocalStorage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.clear();
  };

  return (
    <>
      <div>
        <button onClick={setLocalStorage}>Set localstorge</button>
      </div>
      <div>
        <button onClick={clearLocalStorage}>Clear localstorage</button>
      </div>
      <div>
        <button onClick={() => console.log(localStorage.getItem("name"))}>
          Log
        </button>
      </div>
    </>
  );
};

export default index;
