import { skillIds } from "../json/skillIds";
import { properties } from "../json/properties";

export const parseSkillIds = () => {
  const lines = skillIds.split("\n");
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

export const parseProps = () => {
  const lines = properties.split("\n");
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
