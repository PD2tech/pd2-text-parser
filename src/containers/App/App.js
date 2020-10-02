import React, { useState, useEffect } from "react";
import { parseItems } from "../../assets/util/parseItems";
import { combineAll } from "../../assets/util/combineItems";

export const App = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    const stuff = async () => {
      let result = await combineAll();
      setState(result);
    };
    stuff();
  }, []);
  return (
    <div className="App">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
