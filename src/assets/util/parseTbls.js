import { stringTbl } from "../text/string.tbl";
import { patchString } from "../text/patchstring";
import { patchString2 } from "../text/patchstring2";
import { expansionString } from "../text/expansionstring";

export const parseTbls = () => {
  const lines1 = stringTbl.split("\n");
  const lines2 = patchString.split("\n");
  const lines3 = patchString2.split("\n");
  const lines4 = expansionString.split("\n");
  let firstResult = [];
  let secondResult = [];
  let thirdResult = [];
  let fourthResult = [];
  const headers = lines1[0].split(",");

  // converts csv data into objects
  for (let i = 1; i < lines1.length; i++) {
    let obj = {};
    const currentline = lines1[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      const val = currentline[j];
      if (val !== "") {
        obj[headers[j]] = currentline[j];
      }
    }

    firstResult.push(obj);
  }
  for (let k = 1; k < lines2.length; k++) {
    let obj = {};
    const currentline = lines2[k].split(",");

    for (let l = 0; l < headers.length; l++) {
      const val = currentline[l];
      if (val !== "") {
        obj[headers[l]] = currentline[l];
      }
    }

    secondResult.push(obj);
  }
  for (let y = 1; y < lines3.length; y++) {
    let obj = {};
    const currentline = lines3[y].split(",");

    for (let z = 0; z < headers.length; z++) {
      const val = currentline[z];
      if (val !== "") {
        obj[headers[z]] = currentline[z];
      }
    }

    thirdResult.push(obj);
  }
  for (let w = 1; w < lines4.length; w++) {
    let obj = {};
    const currentline = lines4[w].split(",");

    for (let x = 0; x < headers.length; x++) {
      const val = currentline[x];
      if (val !== "") {
        obj[headers[x]] = currentline[x];
      }
    }

    fourthResult.push(obj);
  }

  return [...firstResult, ...secondResult, ...thirdResult, ...fourthResult];
};
