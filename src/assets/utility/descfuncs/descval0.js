import allStrings from "../json/allStrings.json";
import charSkills from "../json/charSkills.json";
// descfuncs for descval === 0
// descfunc values: 0, 3, 9, 11, 15, 16

const descFuncs = {
  descfunc0: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return "Corrupt";
  },
  // Besides the max and min percent stats, just returns the string for the property
  // e.g. Cannot Be Frozen or Indestructible.
  descfunc3: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
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
  descfunc9: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return `${string} ${string2}`;
  },
  // item_replenish_durability. Takes par value. 100 / X
  descfunc11: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return `Repairs Durability`;
  },
  // item_splashonhit
  descfunc15: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return `${string}`;
  },
  // item_aura
  descfunc16: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
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

export const descval0 = (itemStatObj, propCode, par, min, max) => {
  const { Stat, descfunc, descstrpos, descstr2 } = itemStatObj;
  const string = allStrings.find((str) => str.id === descstrpos).str;
  let string2 = "";
  let skill = "{Skill}";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  // The weirdness for handling skill based stats.
  // some provide an id for the parameter and some are just the name
  if (propCode === "aura") {
    findSkill = charSkills.find((obj) => obj.id === par);
    if (findSkill === undefined) {
      skill = par;
    } else {
      skill = findSkill.skill;
    }
  }
  if (descfunc === undefined) {
    return;
  }
  const handler = descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat, min, max, skill);
};
