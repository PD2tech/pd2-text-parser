import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
// import { classSkillUtil } from "./classSkillUtil";
// import { descFuncUtil } from "./descFuncs";
// import { isMissingData, fixStat } from "./fixMissing";
// import treeIds from "../json/skilltab.json";
// import skillIds from "../json/skillIds.json";
//
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
      return { code: obj.code, name: obj.code };
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
    const hasMulti = Object.keys(obj).includes("stat2");
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

          acc["name"] = !hasMulti ? statObj.Stat : propCode;
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
  return all_stats
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
          stat1: stat.stat2,
        };
      }
      return stat;
    })
    .filter((obj) => obj.stat1);
};

//   export const statEnum = () => {
//   const stats = itemStat.map((obj) => {
//     let string = "";
//     if (obj.descval && obj.descval === "0") {
//       string = descval0(obj);
//     } else if (obj.descval && obj.descval === "1") {
//       string = descval1(obj);
//     } else if (obj.descval && obj.descval === "2") {
//       string = descval2(obj);
//     } else {
//       string = nodescval(obj);
//     }
//     const id = obj.Stat;
//     return string
//       ? {
//           id: id,
//           string: string,
//         }
//       : null;
//   });
//   console.log(getProps());
//   return stats.filter((item) => item);
// };
