import allStrings from "../json/allStrings.json";
// descfuncs for descval === 1
// descfunc values: 1, 2, 3, 4, 6, 7, 8, 13, 20, 22, 23

const descFuncs = {
  descfunc1: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    if (min < 0) {
      return `${min} ${string}`;
    } else {
      return min !== max ? `+${min}-${max} ${string}` : `+${min} ${string}`;
    }
  },
  descfunc2: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${min}-${max}% ${string}` : `${min}% ${string}`;
  },
  descfunc3: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${min}-${max} ${string}` : `${min} ${string}`;
  },
  descfunc4: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `+${min}-${max}% ${string}` : `+${min}% ${string}`;
  },
  descfunc6: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    let newMax = max;
    let newMin = min;
    if (typeof newMax === "number") {
      console.log("finish descfunc6 in descval1");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc6 in descval1");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `+${min}-${newMax} ${string} ${string2}`
      : `+${min}-${newMin} ${string} ${string2}`;
  },
  descfunc7: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    let newMax = max;
    let newMin = min;
    if (typeof newMax === "number") {
      console.log("finish descfunc7 in descval1");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc7 in descval1");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `${min}-${newMax}% ${string} ${string2}`
      : `${min}-${newMin}% ${string} ${string2}`;
  },
  descfunc8: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    let newMax = max;
    let newMin = min;
    if (typeof newMax === "number") {
      console.log("finish descfunc8 in descval1");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc8 in descval1");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `+${min}-${newMax}% ${string} ${string2}`
      : `+${min}-${newMin}% ${string} ${string2}`;
  },
  // item_addclassskills - needs custom handler here or something for differentiating class
  descfunc13: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `+${min}-${max} ${string}` : `+${min} ${string}`;
  },
  descfunc20: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `-${min}-${max}% ${string}` : `-${min}% ${string}`;
  },
  descfunc22: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max
      ? `+${min}-${max}% ${string} <monster type>`
      : `+${min}% ${string} <monster type>`;
  },
  // need to get monster name parameter
  descfunc23: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return `${min}% ${string} <monster type>`;
  },
};

export const descval1 = (itemStatObj) => {
  const { Stat, descfunc, descstrpos, descpriority, descstr2 } = itemStatObj;
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat);
};
