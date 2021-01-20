import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
// import allStrings from "../json/allStrings.json";
import gems from "../json/gems.json";
import { descval0 } from "../descfuncs/descval0";
import { descval1 } from "../descfuncs/descval1";
import { descval2 } from "../descfuncs/descval2";
import { nodescval } from "../descfuncs/nodescval";
import { fixStat } from "../descfuncs/fixStat";
import { handleMulti } from "../descfuncs/handleMulti";

const isStat = (propObj) => {
  return Object.keys(propObj).includes("stat1");
};
const isMulti = (propObj) => {
  return Object.keys(propObj).includes("stat2");
};

export const parseGems = () => {
  return gems.map((item) => {
    const sockets = Object.entries(item).map(([key, val]) => {
      let propCode;
      let par;
      let min;
      let max;
      let type;
      let result;

      if (key !== "weaponMod1Code" && key !== "helmMod1Code" && key !== "shieldMod1Code") {
        console.log("skip");
      } else {
        if (key === "weaponMod1Code") {
          propCode = item["weaponMod1Code"];
          par = item["weaponMod1Param"];
          min = parseInt(item["weaponMod1Min"]);
          max = parseInt(item["weaponMod1Max"]);
          type = "weapon";
        } else if (key === "helmMod1Code") {
          propCode = item["helmMod1Code"];
          par = item["helmMod1Param"];
          min = parseInt(item["helmMod1Min"]);
          max = parseInt(item["helmMod1Max"]);
          type = "armor/helm";
        } else if (key === "shieldMod1Code") {
          propCode = item["shieldMod1Code"];
          par = item["shieldMod1Param"];
          min = parseInt(item["shieldMod1Min"]);
          max = parseInt(item["shieldMod1Max"]);
          type = "shield";
        }
        let propObj = Object.assign(
          {},
          properties.find((obj) => obj.code === propCode)
        );
        let hasStat = isStat(propObj);
        let hasMulti = isMulti(propObj);
        let mod;
        if (hasStat && !hasMulti) {
          const itemStatObj = Object.assign(
            {},
            itemStat.find((obj) => obj.Stat === propObj.stat1)
          );

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
        if (!hasStat) {
          const propCode = propObj.code;
          mod = fixStat(propCode, min, max);
        }
        if (hasStat && hasMulti) {
          mod = handleMulti(propObj, min, max);
        }
        result = { group: type, ...mod };
      }
      return result;
    });
    const filtered = sockets.filter((val) => val);
    return {
      name: item.name,
      code: item.code,
      sockets: filtered,
    };
  });
};
// let gem_item = [];
//     rune_recipe.forEach((code) => {
//       const rune = Object.assign(
//         {},
//         gems.find((obj) => obj.code === code)
//       );
//       for (let i = 0; i < runeModTypes.length; i++) {
//         const type = runeModTypes[i];
//         let propCode;
//         let propObj;
//         let par;
//         let min;
//         let max;
//         if (type === "weapon") {
//           propCode = rune["weaponMod1Code"];
//           par = rune["weaponMod1Param"];
//           min = parseInt(rune["weaponMod1Min"]);
//           max = parseInt(rune["weaponMod1Max"]);
//         }
//         if (type === "armor") {
//           propCode = rune["helmMod1Code"];
//           par = rune["helmMod1Param"];
//           min = parseInt(rune["helmMod1Min"]);
//           max = parseInt(rune["helmMod1Max"]);
//         }
//         if (type === "shield") {
//           propCode = rune["shieldMod1Code"];
//           par = rune["shieldMod1Param"];
//           min = parseInt(rune["shieldMod1Min"]);
//           max = parseInt(rune["shieldMod1Max"]);
//         }
//         propObj = Object.assign(
//           {},
//           properties.find((obj) => obj.code === propCode)
//         );
//         let hasStat = isStat(propObj);
//         let hasMulti = isMulti(propObj);
//         let mod;
//         if (hasStat && !hasMulti) {
//           const itemStatObj = Object.assign(
//             {},
//             itemStat.find((obj) => obj.Stat === propObj.stat1)
//           );

//           if (itemStatObj.descval && itemStatObj.descval === "0") {
//             mod = descval0(itemStatObj, propCode, par, min, max);
//           }
//           if (itemStatObj.descval && itemStatObj.descval === "1") {
//             mod = descval1(itemStatObj, propCode, par, min, max);
//           }
//           if (itemStatObj.descval && itemStatObj.descval === "2") {
//             mod = descval2(itemStatObj, propCode, par, min, max);
//           }
//           if (itemStatObj.descval === undefined && itemStatObj.Stat !== undefined) {
//             mod = nodescval(itemStatObj, propCode, par, min, max);
//           }
//         }
//         if (!hasStat) {
//           const propCode = propObj.code;
//           mod = fixStat(propCode, min, max);
//         }
//         if (hasStat && hasMulti) {
//           mod = handleMulti(propObj, min, max);
//         }
//         gem_item.push({ type: type, ...mod });
//       }
//     });
