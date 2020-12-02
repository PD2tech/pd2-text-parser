import allStrings from "../json/allStrings.json";
// ItemStatCost entries with no descval
// descfunc values: 14, 15, 24, 27, 28

const descFuncs = {
  // item_addskill_tab (+ to skill tree)
  descfunc14: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<SkillTree>"
  ) => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
  // item_skillonattack, item_skillonkill, item_skillondeath, item_skillonhit,
  // item_skillonlevelup, item_skillongethit, map_mon_skillondeath (CTC some skill on event)
  descfunc15: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
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
  // item_charged_skill
  descfunc24: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return `Level ${max} ${skill} (${min} Charges)`;
  },
  // item_singleskill
  descfunc27: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
  // item_nonclassskill
  descfunc28: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
  // will need number to define which class
  randomSkill: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<RandomClassSkill>"
  ) => {
    return min !== max ? `+${min}-${max} to ${skill}` : `+${min} to ${skill}`;
  },
};

export const nodescval = (itemStatObj, propCode) => {
  const { Stat, descfunc, descstrpos, descpriority, descstr2 } = itemStatObj;
  const hasString = allStrings.find((str) => str.id === descstrpos);
  const string = hasString !== undefined ? hasString.str : "";
  let string2 = "";
  if (descstr2) {
    string2 = allStrings.find((str) => str.id === descstr2).str;
  }
  if (descfunc === undefined) {
    return;
  }
  const handler =
    propCode === "skill-rand"
      ? descFuncs["randomSkill"]
      : descFuncs[`descfunc${descfunc}`];
  return handler(string, string2, Stat);
};
