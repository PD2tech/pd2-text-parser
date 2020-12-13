import itemStat from "../../reference/itemstat.json";
import { descval0 } from "./descval0";
import { descval1 } from "./descval1";
import { descval2 } from "./descval2";
import { nodescval } from "./nodescval";

// example propObj
// {
//   "code": "res-all",
//   "stat1": "fireresist",
//   "stat2": "lightresist",
//   "stat3": "coldresist",
//   "stat4": "poisonresist",
//   ... other irrelevant stuff
// }
export const handleMulti = (propObj, min, max) => {
  const propCode = propObj.code;
  const modArr = [];
  Object.entries(propObj).reduce((acc, [key, val]) => {
    if (key.includes("stat")) {
      const statNum = key.slice(0, 4);
      const itemStatObj = itemStat.find((obj) => obj.Stat === val);
      let mod;
      let par = "";
      if (itemStatObj === undefined) {
        console.log(`${key}: ${val}`);
      } else {
        if (itemStatObj.descval && itemStatObj.descval === "0") {
          mod = descval0(itemStatObj, propCode, par, min, max);
        }
        if (itemStatObj.descval && itemStatObj.descval === "1") {
          mod = descval1(itemStatObj, propCode, par, min, max);
        }
        if (itemStatObj.descval && itemStatObj.descval === "2") {
          mod = descval2(itemStatObj, propCode, par, min, max);
        }
        if (itemStatObj.descval === undefined && itemStatObj.Stat !== undefined) {
          mod = nodescval(itemStatObj, propCode, par, min, max);
        }
      }
      acc[`stat${statNum}`] = mod;
      modArr.push(mod);
    }
    return acc;
  }, {});
  const fixMulti = modArr.map((obj) => {
    if (obj !== undefined) {
      return {
        stat: obj.name,
        descstr: obj.display,
      };
    }
    return null;
  });
  const filterNull = fixMulti.filter((obj) => obj);

  if (propCode === "res-all") {
    return {
      code: propCode,
      name: propCode,
      display: min !== max ? `All Resistances +${min}-${max}` : `All Resistances +${min}`,
      min: min,
      max: max,
      order: 36,
      sub_stats: filterNull,
    };
  } else if (propCode === "all-stats") {
    return {
      code: propCode,
      name: propCode,
      display: min !== max ? `+${min}-${max} to All Attributes` : `+${min} to All Attributes`,
      min: min,
      max: max,
      order: 61,
      sub_stats: filterNull,
    };
  } else if (propCode === "res-all-max") {
    return {
      code: propCode,
      name: propCode,
      display:
        min !== max ? `All Maximum Resistances +${min}-${max}` : `All Maximum Resistances +${min}`,
      min: min,
      max: max,
      order: 42,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-fire") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Fire Damage`,
      min: min,
      max: max,
      order: 102,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-cold") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Cold Damage`,
      min: min,
      max: max,
      order: 96,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-ltng") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Lightning Damage`,
      min: min,
      max: max,
      order: 99,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-pois") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Poison Damage`,
      min: min,
      max: max,
      order: 92,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-mag") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Magic Damage`,
      min: min,
      max: max,
      order: 104,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-norm") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Damage`,
      min: min,
      max: max,
      order: 127,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-elem") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} Elemental Damage (Fire, Cold, Lightning)`,
      min: min,
      max: max,
      order: 101,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-elem-min") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} to Minumum Elemental Damage (Fire, Cold, Lightning)`,
      min: min,
      max: max,
      order: 102,
      sub_stats: filterNull,
    };
  } else if (propCode === "dmg-elem-max") {
    return {
      code: propCode,
      name: propCode,
      display: `Adds ${min}-${max} to Maximum Elemental Damage (Fire, Cold, Lightning)`,
      min: min,
      max: max,
      order: 103,
      sub_stats: filterNull,
    };
  } else if (propCode === "fireskill") {
    return {
      code: propCode,
      name: propCode,
      display: filterNull[1].descstr,
      min: min,
      max: max,
      order: 157,
      sub_stats: [filterNull[1]],
    };
  } else if (propCode === "coldskill") {
    return {
      code: propCode,
      name: propCode,
      display: filterNull[1].descstr,
      min: min,
      max: max,
      order: 157,
      sub_stats: [filterNull[1]],
    };
  } else if (propCode === "ltngskill") {
    return {
      code: propCode,
      name: propCode,
      display: filterNull[1].descstr,
      min: min,
      max: max,
      order: 157,
      sub_stats: [filterNull[1]],
    };
  } else if (propCode === "magskill") {
    return {
      code: propCode,
      name: propCode,
      display: filterNull[1].descstr,
      min: min,
      max: max,
      order: 157,
      sub_stats: [filterNull[1]],
    };
  } else if (propCode === "poisskill") {
    return {
      code: propCode,
      name: propCode,
      display: filterNull[1].descstr,
      min: min,
      max: max,
      order: 157,
      sub_stats: [filterNull[1]],
    };
  }
};
