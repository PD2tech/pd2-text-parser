import allStrings from "../json/allStrings.json";
// descfuncs for descval === 2
// descfunc values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 20
// ignore 18 - used for bytime stats that aren't used in game

const descFuncs = {
  descfunc1: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} +${min}-${max}` : `${string} +${min}`;
  },
  descfunc2: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} ${min}-${max}%` : `${string} ${min}%`;
  },
  descfunc3: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} ${min}-${max}` : `${string} ${min}`;
  },
  descfunc4: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    if (min > 0) {
      return min !== max ? `${string} +${min}-${max}%` : `${string} +${min}%`;
    } else {
      return min !== max ? `${string} ${min} to ${max}%` : `${string} ${min}%`;
    }
  },
  descfunc5: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} ${min}-${max}%` : `${string} ${min}%`;
  },
  descfunc6: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    let newMin = min;
    let newMax = max;
    if (typeof newMax === "number") {
      console.log("finish descfunc6 in descval1");
      newMax = Math.round(newMax * 99);
    }
    if (typeof newMin === "number") {
      console.log("finish descfunc6 in descval1");
      newMax = Math.round(newMin * 99);
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
  descfunc7: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    let newMin = min;
    let newMax = max;
    if (typeof newMax === "number") {
      newMax = Math.round(newMax * 99);
    }
    if (typeof newMin === "number") {
      newMin = Math.round(newMin * 99);
    }
    return min !== max
      ? `${string} +${min}-${newMax}% ${string2}`
      : `${string} +${min}-${newMin}% ${string2}`;
  },
  // might need a condition for min being a negative number to have remove the "+"
  descfunc8: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    let newMin = min;
    let newMax = max;
    if (typeof newMax === "number") {
      newMax = Math.round(newMax * 99);
    }
    if (typeof newMin === "number") {
      newMin = Math.round(newMin * 99);
    }
    return min !== max
      ? `${string} +${min}-${newMax}% ${string2}`
      : `${string} +${min}-${newMin}% ${string2}`;
  },
  descfunc9: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    let newMin = min;
    let newMax = max;
    if (typeof newMax === "number") {
      newMax = Math.round(newMax * 99);
    }
    if (typeof newMin === "number") {
      newMin = Math.round(newMin * 99);
    }
    if (Stat === "extra_revives") {
      return `${string} +${min} ${string2}`;
    }
    return min !== max
      ? `${string} +${min}-${newMax} ${string2}`
      : `${string} +${min}-${newMin} ${string2}`;
  },
  descfunc12: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} +${min}-${max}` : `${string} +${min}`;
  },
  descfunc20: (string, string2, Stat, min = "{X}", max = "{X}", skill = "{Skill}") => {
    return min !== max ? `${string} -${min}-${max}%` : `${string} -${min}%`;
  },
};

export const descval2 = (itemStatObj, propCode, par, min, max) => {
  const { Stat, descfunc, descstrpos, descstr2, descpriority } = itemStatObj;
  let order = 160;
  if (descpriority !== undefined) {
    order = parseInt(itemStatObj.descpriority);
  }
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  if (descfunc === undefined || descfunc === "18") {
    return;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  // math for per/lvl stats
  let calcMin = min;
  let calcMax = max;
  if (Stat.includes("perlevel") && Stat.includes("item_tohit") === false) {
    calcMin = parseInt(min) / 8;
    calcMax = parseInt(max) / 8;
    if (calcMin === undefined || isNaN(calcMin)) {
      calcMin = parseInt(par) / 8;
      calcMax = parseInt(par) / 8;
    }
  } else if (Stat.includes("perlevel") && Stat.includes("item_tohit")) {
    calcMin = parseInt(min) / 2;
    calcMax = parseInt(max) / 2;
    if (calcMin === undefined || isNaN(calcMin)) {
      calcMin = parseInt(par) / 2;
      calcMax = parseInt(par) / 2;
    }
  }
  return {
    code: propCode,
    name: Stat ? Stat : propCode,
    display: handler(string, string2, Stat, calcMin, calcMax),
    min: min ? min : calcMin,
    max: min ? max : calcMax,
    order,
    sub_stats: [],
  };
  // return handler(string, string2, Stat, calcMin, calcMax);
};
