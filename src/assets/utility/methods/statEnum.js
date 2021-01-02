import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
import { descval0 } from "../descfuncs/descval0";
import { descval1 } from "../descfuncs/descval1";
import { descval2 } from "../descfuncs/descval2";
import { nodescval } from "../descfuncs/nodescval";
import { fixStat } from "../descfuncs/fixStat";

// Don't even want to talk about this. Should never have to use this again.

const getProps = (codeval) => {
  const allProps = properties.map((obj) => {
    if (obj.code === "dmg-min" || obj.code === "dmg-max" || obj.code === "dmg%") {
      return { code: obj.code };
    } else {
      const entries = Object.entries(obj);
      const stats = entries.filter(([key, val]) => key.includes("stat"));
      return stats.reduce((acc, [key, val]) => {
        acc["code"] = obj.code;
        acc[key] = val;
        return acc;
      }, {});
    }
  });
  return allProps.filter((obj) => obj.hasOwnProperty("code"));
};

export const statEnum = () => {
  const all_props = getProps();
  const all_stats = all_props.map((obj) => {
    const propCode = obj.code;
    const stat = Object.entries(obj).reduce((acc, [key, val]) => {
      if (key.includes("stat")) {
        const statNum = key.slice(4);
        let string = "";
        const statObj = itemStat.find((obj) => obj.Stat === val);
        if (statObj === undefined) {
          console.log(`${key}: ${val}`);
        } else {
          if (statObj.descval && statObj.descval === "0") {
            string = descval0(statObj, propCode);
          } else if (statObj.descval && statObj.descval === "1") {
            string = descval1(statObj, propCode);
          } else if (statObj.descval && statObj.descval === "2") {
            string = descval2(statObj, propCode);
          } else {
            string = nodescval(statObj, propCode);
          }
          acc["name"] = obj[`stat${statNum}`];
          acc[`display`] = string;
          acc[`stat${statNum}`] = obj[`stat${statNum}`];
          acc[`descstr${statNum}`] = string;
        }
      } else {
        acc[key] = val;
        if (propCode === "dmg-min" || propCode === "dmg-max" || propCode === "dmg%") {
          acc["name"] = propCode;
          acc[`display`] = fixStat(propCode);
          acc["stat1"] = propCode;
          acc["descstr1"] = fixStat(propCode);
        }
      }
      return acc;
    }, {});
    return stat;
  });
  const fixElemSkills = all_stats
    .map((stat) => {
      if (
        stat.code === "fireskill" ||
        stat.code === "coldskill" ||
        stat.code === "ltngskill" ||
        stat.code === "magskill" ||
        stat.code === "poisskill"
      ) {
        return {
          code: stat.code,
          name: stat.name,
          display: stat.descstr2,
          stat1: stat.stat2,
          descstr1: stat.descstr2,
        };
      }
      return stat;
    })
    .filter((obj) => obj.stat1);

  const fixDisplayString = fixElemSkills.map((stat) => {
    if (stat.code === "all-stats") {
      return {
        ...stat,
        name: "all-stats",
        display: "+{X} to All Attributes",
      };
    }
    if (stat.code === "res-all") {
      return {
        ...stat,
        name: stat.code,
        display: "All Resistances +{X}",
      };
    }
    if (stat.code === "res-all-max") {
      return {
        ...stat,
        name: stat.code,
        display: "All Maximum Resistances +{X}",
      };
    }
    if (stat.code === "dmg-fire") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Fire Damage",
      };
    }
    if (stat.code === "dmg-cold") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Cold Damage",
      };
    }
    if (stat.code === "dmg-ltng") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Lightning Damage",
      };
    }
    if (stat.code === "dmg-pois") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Poison Damage",
      };
    }
    if (stat.code === "dmg-mag") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Magic Damage",
      };
    }
    if (stat.code === "dmg-norm") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Damage",
      };
    }
    if (stat.code === "dmg-elem") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} Elemental Damage",
      };
    }
    if (stat.code === "dmg-elem-min") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} to Minimum Elemental Damage",
      };
    }
    if (stat.code === "dmg-elem-max") {
      return {
        ...stat,
        name: stat.code,
        display: "Adds {X}-{Y} to Maximum Elemental Damage",
      };
    }
    return {
      ...stat,
    };
  });
  const statArr = fixDisplayString.map((stat) => {
    const statKeys = Object.keys(stat).filter((key) => key.includes("stat"));
    const statsArr = [];
    for (let i = 0; i < statKeys.length; i++) {
      const num = i + 1;
      statsArr.push({ stat: stat[`stat${num}`], descstr: stat[`descstr${num}`] });
    }
    return {
      code: stat.code,
      name: stat.name,
      display: stat.display,
      stats: statsArr,
    };
  });

  const filterUnused = statArr
    .map((obj) => (obj.display === undefined ? null : obj))
    .filter((obj) => obj);

  return filterUnused;
};
