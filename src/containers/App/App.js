import React, { useState, useEffect } from "react";
// import { parseToJson } from "../../assets/util/parseToJson";
import { parseRunewords } from "../../assets/util/parseRunewords";
// import { combineAll } from "../../assets/util/combineItems";
// import { filterBelts } from "../../assets/util/filterByType";

export const App = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    const stuff = async () => {
      let result = await parseRunewords();
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
