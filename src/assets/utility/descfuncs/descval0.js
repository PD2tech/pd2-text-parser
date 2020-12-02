import allStrings from "../json/allStrings.json";
// descfuncs for descval === 0
// descfunc values: 0, 3, 9, 11, 15, 16

const descFuncs = {
  descfunc0: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return "Corrupt";
  },
  // Besides the max and min percent stats, just returns the string for the property
  // e.g. Cannot Be Frozen or Indestructible.
  descfunc3: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    if (
      Stat === "item_maxdamage_percent" ||
      Stat === "item_mindamage_percent"
    ) {
      return min !== max ? `${min}-${max}% ${string}` : `${min}% ${string}`;
    } else if (Stat === "corrupted") {
      return "Corrupted";
    } else {
      return `${string}`;
    }
  },
  // map mods for monsters
  descfunc9: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return `${string} ${string2}`;
  },
  // item_replenish_durability. Takes par value. 100 / X
  descfunc11: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return `Repairs Durability`;
  },
  // item_splashonhit
  descfunc15: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return `${string}`;
  },
  // item_aura
  descfunc16: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    let replace = string.split(" ");
    for (let i = 0; i < replace.length; i++) {
      if (replace[i] === "%d") {
        replace[i] = min !== max ? `${min}-${max}` : `${min}`;
      } else if (replace[i] === "%s") {
        replace[i] = skill;
      }
    }
    return replace.join(" ");
  },
};

export const descval0 = (itemStatObj) => {
  const { Stat, descfunc, descstrpos, descpriority, descstr2 } = itemStatObj;
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  if (descfunc === undefined) {
    return;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat);
};
