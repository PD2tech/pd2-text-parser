import allStrings from "../json/allStrings.json";
import charSkills from "../json/charSkills.json";
// ItemStatCost entries with no descval
// descfunc values: 14, 15, 24, 27, 28

const descFuncs = {
  // skilltab
  descfunc14: (string, string2, Stat, min = "X", max = "X", skill) => {
    let replace = string.split(" ");
    for (let i = 0; i < replace.length; i++) {
      if (replace[i] === "+%d") {
        replace[i] = min !== max ? `+${min}-${max}` : `+${min}`;
      }
    }
    replace.push(`${string2}`);
    return replace.join(" ");
  },
  // item_skillonattack, item_skillonkill, item_skillondeath, item_skillonhit,
  // item_skillonlevelup, item_skillongethit, map_mon_skillondeath (CTC some skill on event)
  descfunc15: (string, string2, Stat, min = "{X}", max = "{Y}", skill) => {
    let replace = string.split(" ");
    for (let i = 0; i < replace.length; i++) {
      if (replace[i] === "%d%%") {
        replace[i] = `${min}%`;
      } else if (replace[i] === "%d") {
        replace[i] = max;
      } else if (replace[i] === "%s") {
        replace[i] = skill;
      }
    }
    return replace.join(" ");
  },
  // charged
  descfunc24: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return `Level ${max} ${skill} (${min} Charges)`;
  },
  // skill
  descfunc27: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return min !== max ? `+${min}-${max} to ${skill} ${string2}` : `+${min} to ${skill} ${string2}`;
  },
  // oskill
  descfunc28: (string, string2, Stat, min = "{X}", max = "{X}", skill) => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
  // will need number to define which class
  randomSkill: (string, string2, Stat, min = "X", max = "X", skill = "{RandomClassSkill}") => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
};

export const nodescval = (itemStatObj, propCode, par, min, max) => {
  const { Stat, descfunc, descstrpos, descstr2, descpriority } = itemStatObj;
  let order = 160;
  if (descpriority !== undefined) {
    order = parseInt(itemStatObj.descpriority);
  }
  const hasString = allStrings.find((str) => str.id === descstrpos);
  let string = hasString !== undefined ? hasString.str : "";
  let string2 = "";
  let skill = null;
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  if (descfunc === undefined) {
    return;
  }
  // for skill trees
  if (descfunc === "14") {
    const getTree = treeDifferentiator.find((obj) => obj.id === par);
    if (getTree === undefined) {
      string = "<Class>";
      string2 = "<Tree>";
    } else {
      string = allStrings.find((str) => str.id === getTree.str).str;
      string2 = `(${getTree.char} Only)`;
    }
  }
  // skill, oskill, charges, and CTC
  if (descfunc === "15" || descfunc === "24" || descfunc === "27" || descfunc === "28") {
    const findSkill = charSkills.find((obj) => obj.id === par);
    // I hate everything about the text files
    if (findSkill === undefined) {
      if (par === "Plague Poppy") {
        skill = "Poison Creeper";
        string2 = "(Druid Only)";
      } else if (par === "LowRes") {
        skill = "Lower Resist";
        string2 = "(Necromancer Only)";
      } else if (par === "Eruption") {
        skill = "Fissure";
        string2 = "(Druid Only)";
      } else if (par === "AmpDmg") {
        skill = "Amplify Damage";
        string2 = "(Necromancer Only)";
      } else if (par === "IronGolem") {
        skill = "Iron Golem";
        string2 = "(Necromancer Only)";
      } else if (par === "FireGolem") {
        skill = "Fire Golem";
        string2 = "(Necromancer Only)";
      } else if (par === "BloodGolem") {
        skill = "Blood Golem";
        string2 = "(Necromancer Only)";
      } else if (par === "Enchant") {
        skill = "Enchant Fire";
        string2 = "(Sorceress Only)";
      } else {
        skill = par;
        if (descfunc === "27") {
          const findChar = charSkills.find((obj) => obj.skill === par);
          if (findChar !== undefined) {
            string2 = `(${findChar.char} Only)`;
          }
        }
      }
    } else {
      skill = findSkill.skill;
      if (descfunc === "27") {
        string2 = `(${findSkill.char} Only)`;
      }
    }
  }

  const handler =
    propCode === "skill-rand" ? descFuncs["randomSkill"] : descFuncs[`descfunc${descfunc}`];
  if (skill) {
    return {
      code: propCode,
      name: Stat ? Stat : propCode,
      skill,
      display: handler(string, string2, Stat, min, max, skill),
      min: min ? min : par,
      max: min ? max : par,
      order,
      sub_stats: [],
    };
  } else {
    return {
      code: propCode,
      name: Stat ? Stat : propCode,
      display: handler(string, string2, Stat, min, max, skill),
      min: min ? min : par,
      max: min ? max : par,
      order,
      sub_stats: [],
    };
  }
  // return handler(string, string2, Stat, min, max, skill);
};

const treeDifferentiator = [
  {
    str: "StrSklTabItem3",
    char: "Amazon",
    id: "0",
  },
  {
    str: "StrSklTabItem2",
    char: "Amazon",
    id: "1",
  },
  {
    str: "StrSklTabItem1",
    char: "Amazon",
    id: "2",
  },
  {
    str: "StrSklTabItem15",
    char: "Sorceress",
    id: "3",
  },
  {
    str: "StrSklTabItem13",
    char: "Sorceress",
    id: "4",
  },
  {
    str: "StrSklTabItem14",
    char: "Sorceress",
    id: "5",
  },
  {
    str: "StrSklTabItem8",
    char: "Necromancer",
    id: "6",
  },
  {
    str: "StrSklTabItem7",
    char: "Necromancer",
    id: "7",
  },
  {
    str: "StrSklTabItem6",
    char: "Necromancer",
    id: "8",
  },
  {
    str: "StrSklTabItem6",
    char: "Paladin",
    id: "9",
  },
  {
    str: "StrSklTabItem4",
    char: "Paladin",
    id: "10",
  },
  {
    str: "StrSklTabItem5",
    char: "Paladin",
    id: "11",
  },
  {
    str: "StrSklTabItem11",
    char: "Barbarian",
    id: "12",
  },
  {
    str: "StrSklTabItem12",
    char: "Barbarian",
    id: "13",
  },
  {
    str: "StrSklTabItem10",
    char: "Barbarian",
    id: "14",
  },
  {
    str: "StrSklTabItem16",
    char: "Druid",
    id: "15",
  },
  {
    str: "StrSklTabItem17",
    char: "Druid",
    id: "16",
  },
  {
    str: "StrSklTabItem18",
    char: "Druid",
    id: "17",
  },
  {
    str: "StrSklTabItem19",
    char: "Assassin",
    id: "18",
  },
  {
    str: "StrSklTabItem20",
    char: "Assassin",
    id: "19",
  },
  {
    str: "StrSklTabItem21",
    char: "Assassin",
    id: "20",
  },
];
