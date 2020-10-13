import { runes } from "../text/runes";

export const parseToJson = () => {
  const lines = runes.split("\n");
  let firstResult = [];
  const headers = lines[0].split(",");

  // converts csv data into objects
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      const val = currentline[j];
      if (val !== "") {
        obj[headers[j]] = currentline[j];
      }
    }

    firstResult.push(obj);
  }
  return firstResult;
};
