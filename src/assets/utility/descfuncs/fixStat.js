const descFuncs = {
  mindmg: (min = "{X}", max = "{X}") => {
    return min !== max ? `+${min}-${max} to Minimum Damage` : `+${min} to Minimum Damage`;
  },
  maxdmg: (min = "{X}", max = "{X}") => {
    return min !== max ? `+${min}-${max} to Maximum Damage` : `+${min} to Maximum Damage`;
  },
  enhanceddmg: (min = "{X}", max = "{X}") => {
    return min !== max ? `+${min}-${max}% Enhanced Damage` : `+${min}% Enhanced Damage`;
  },
  indestruct: () => {
    return "Indestructible";
  },
  ethereal: () => {
    return "Ethereal";
  },
};

const fixStats = [
  { code: "dmg-min", descfunc: "mindmg" },
  { code: "dmg-max", descfunc: "maxdmg" },
  { code: "dmg%", descfunc: "enhanceddmg" },
  { code: "indestruct", descfunc: "indestruct" },
  { code: "ethereal", descfunc: "ethereal" },
];

export const fixStat = (propCode, min, max) => {
  if (propCode === "pois-len" || propCode === "cold-len") {
    return;
  }
  const func = fixStats.find((obj) => obj.code === propCode);
  const handler = descFuncs[`${func.descfunc}`];
  let order = 160;
  if (propCode === "ethereal" || propCode === "indestruct") {
    order = 0;
  }
  return {
    code: propCode,
    name: propCode,
    display: handler(min, max),
    min: min,
    max: max,
    order: order,
    sub_stats: [],
  };
};
