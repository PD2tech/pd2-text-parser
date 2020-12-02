const descFuncs = {
  mindmg: (string, string2, Stat, min = "X", max = "X", skill = "<Skill>") => {
    return min !== max
      ? `+${min}-${max} to Minimum Damage`
      : `+${min} to Minimum Damage`;
  },
  maxdmg: (string, string2, Stat, min = "X", max = "X", skill = "<Skill>") => {
    return min !== max
      ? `+${min}-${max} to Maximum Damage`
      : `+${min} to Maximum Damage`;
  },
  enhanceddmg: (
    string,
    string2,
    Stat,
    min = "X",
    max = "X",
    skill = "<Skill>"
  ) => {
    return min !== max
      ? `+${min}-${max}% Enhanced Damage`
      : `+${min}% Enhanced Damage`;
  },
};

const fixStats = [
  { code: "dmg-min", descfunc: "mindmg" },
  { code: "dmg-max", descfunc: "maxdmg" },
  { code: "dmg%", descfunc: "enhanceddmg" },
];

export const fixStat = (propCode) => {
  const func = fixStats.find((obj) => obj.code === propCode).descfunc;
  const handler = descFuncs[`${func}`];
  return handler();
};
