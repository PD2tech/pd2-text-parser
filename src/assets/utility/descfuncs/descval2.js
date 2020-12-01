import allStrings from "../json/allStrings.json";
// descfuncs for descval === 2
// descfunc values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 20

const descFuncs = {
  descfunc1: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} +${min}-${max}` : `${string} +${min}`;
  },
  descfunc2: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} ${min}-${max}%` : `${string} ${min}%`;
  },
  descfunc3: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} ${min}-${max}` : `${string} ${min}`;
  },
  descfunc4: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    if (min > 0) {
      return min !== max ? `${string} +${min}-${max}%` : `${string} +${min}%`;
    } else {
      return min !== max ? `${string} ${min} to ${max}%` : `${string} ${min}%`;
    }
  },
  descfunc5: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} ${min}-${max}%` : `${string} ${min}%`;
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
    if (Stat === "map_mon_magicmindam" || Stat === "map_mon_magicmaxdam") {
      return min !== max
        ? `${string} +${min}-${newMax} Magic Damage`
        : `${string} +${min}-${newMin} Magic Damage`;
    }
    return min !== max
      ? `${string} +${min}-${newMax} ${string2}`
      : `${string} +${min}-${newMin} ${string2}`;
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
      console.log("finish descfunc7 in descval2");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc7 in descval2");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `${string} +${min}-${newMax}% ${string2}`
      : `${string} +${min}-${newMin}% ${string2}`;
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
      console.log("finish descfunc8 in descval2");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc8 in descval2");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `${string} +${min}-${newMax}% ${string2}`
      : `${string} +${min}-${newMin}% ${string2}`;
  },
  descfunc9: (
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
      console.log("finish descfunc7 in descval2");
      newMax = Math.round(newMax * 100);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc7 in descval2");
      newMax = Math.round(newMin * 100);
    }
    return min !== max
      ? `${string} +${min}-${newMax} ${string2}`
      : `${string} +${min}-${newMin} ${string2}`;
  },
  descfunc12: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} +${min}-${max}` : `${string} +${min}`;
  },
  descfunc20: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `${string} -${min}-${max}%` : `${string} -${min}%`;
  },
};

export const descval2 = (itemStatObj) => {
  const { Stat, descfunc, descstrpos, descpriority, descstr2 } = itemStatObj;
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  if (descfunc === undefined) {
    debugger;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat);
};
