import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
import { descval0 } from "../descfuncs/descval0";
import { descval1 } from "../descfuncs/descval1";
import { descval2 } from "../descfuncs/descval2";
import { nodescval } from "../descfuncs/nodescval";
import { fixStat } from "../descfuncs/fixStat";

const getProps = (codeval) => {
  const allProps = properties.map((obj) => {
    if (
      obj.code === "dmg-min" ||
      obj.code === "dmg-max" ||
      obj.code === "dmg%"
    ) {
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

          acc[key] = string;
        }
      } else {
        acc[key] = val;
        if (
          propCode === "dmg-min" ||
          propCode === "dmg-max" ||
          propCode === "dmg%"
        ) {
          acc["stat1"] = fixStat(propCode);
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
          stat1: stat.stat2,
        };
      }
      return stat;
    })
    .filter((obj) => obj.stat1);

  const fixDisplayString = fixElemSkills.map((stat) => {
    if (stat.code === "all-stats") {
      return {
        ...stat,
        displayName: "+{X} to All Attributes",
      };
    }
    if (stat.code === "res-all") {
      return {
        ...stat,
        displayName: "All Resistances +{X}",
      };
    }
    if (stat.code === "res-all-max") {
      return {
        ...stat,
        displayName: "All Maximum Resistances +{X}",
      };
    }
    if (stat.code === "dmg-fire") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Fire Damage",
      };
    }
    if (stat.code === "dmg-cold") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Cold Damage",
      };
    }
    if (stat.code === "dmg-ltng") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Lightning Damage",
      };
    }
    if (stat.code === "dmg-pois") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Poison Damage",
      };
    }
    if (stat.code === "dmg-mag") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Magic Damage",
      };
    }
    if (stat.code === "dmg-norm") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Damage",
      };
    }
    if (stat.code === "dmg-fire") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Fire Damage",
      };
    }
    if (stat.code === "dmg-elem") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} Elemental Damage",
      };
    }
    if (stat.code === "dmg-elem-min") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} to Minimum Elemental Damage",
      };
    }
    if (stat.code === "dmg-elem-max") {
      return {
        ...stat,
        displayName: "Adds {X}-{Y} to Maximum Elemental Damage",
      };
    }
    return {
      ...stat,
      displayName: stat.stat1,
    };
  });

  return fixDisplayString;
};
