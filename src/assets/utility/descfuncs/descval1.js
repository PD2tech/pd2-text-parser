import allStrings from "../json/allStrings.json";
// descfuncs for descval === 1
// descfunc values: 1, 2, 3, 4, 6, 7, 8, 13, 20, 22, 23
// ignore 17 & 18 - used for bytime stats that aren't used in game

const descFuncs = {
  descfunc1: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
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
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return min !== max ? `${min}-${max}% ${string}` : `${min}% ${string}`;
  },
  descfunc3: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return min !== max ? `${min}-${max} ${string}` : `${min} ${string}`;
  },
  descfunc4: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return min !== max ? `+${min}-${max}% ${string}` : `+${min}% ${string}`;
  },
  descfunc6: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    let newMax = "{Y}";
    let newMin = "{Y}";
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
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    let newMax = "{Y}";
    let newMin = "{Y}";
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
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    let newMax = "{Y}";
    let newMin = "{Y}";
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
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return min !== max ? `+${min}-${max} ${string2}` : `+${min} ${string2}`;
  },
  descfunc20: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return min !== max ? `-${min}-${max}% ${string}` : `-${min}% ${string}`;
  },
  // I don't think this is actually used since there are specific stats for undead and demons
  // and no other monster type
  descfunc22: (
    string,
    string2,
    Stat,
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
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
    min = "{X}",
    max = "{X}",
    skill = "{Skill}"
  ) => {
    return `${min}% ${string} ${string2}`;
  },
};

export const descval1 = (itemStatObj, propCode, par, min, max) => {
  const { Stat, descfunc, descstrpos, descstr2 } = itemStatObj;
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  // not all stats have a secondary string
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  // specific for handling +all skills to character class
  if (descfunc === "13") {
    const getClass = classDifferentiator.find((obj) => obj.name === propCode);
    if (getClass !== undefined) {
      string2 = allStrings.find((str) => str.id === getClass.id).str;
    } else {
      string2 = "to <RandomClass> Skills";
    }
  }
  // monster type for reanimate
  if (descfunc === "23") {
    string2 = monsterType.find((obj) => obj.id === par).name;
  }
  // ignored
  if (descfunc === undefined || descfunc === "17" || descfunc === "18") {
    return;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat, min, max);
};

const monsterType = [
  {
    id: "492",
    name: "Demon Imp",
  },
  {
    id: "1",
    name: "Returned",
  },
  {
    id: "457",
    name: "Hellspawn",
  },
];

const classDifferentiator = [
  {
    name: "ama",
    id: "ModStr3a",
  },
  {
    name: "pal",
    id: "ModStr3b",
  },
  {
    name: "nec",
    id: "ModStr3c",
  },
  {
    name: "sor",
    id: "ModStr3d",
  },
  {
    name: "bar",
    id: "ModStr3e",
  },
  {
    name: "dru",
    id: "ModStre8a",
  },
  {
    name: "ass",
    id: "ModStre8b",
  },
];
