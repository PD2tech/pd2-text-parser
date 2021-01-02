import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
import allStrings from "../json/allStrings.json";
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

export const parseUniques = (uniqueItems) => {
  return uniqueItems.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.index);
    const base_name_obj = allStrings.find((str) => str.id === item.code);
    const base_name = base_name_obj !== undefined ? base_name_obj.str : item[`*type`];
    const item_name = str_obj_name !== undefined ? str_obj_name.str : item.index;
    const item_base_code = item.code;
    const level_requirement = parseInt(item["lvl req"]);
    const item_mods = Object.entries(item).reduce((acc, [key, val]) => {
      if (key.includes("prop") && val !== "" && !val.includes("*")) {
        // gets the number from the column key to get the par#, min#, and max# values
        const propNum = key.slice(4);
        // finds the property based on the prop column value in UniqueItems.txt
        const propObj = Object.assign(
          {},
          properties.find((obj) => obj.code === val)
        );
        // checks the found property to see if it actually has a stat1 to search in ItemStatCost.txt
        let hasStat = isStat(propObj);
        // checks the found property to see if it has multiple stats associated with it
        // that need to all be searched in ItemStatCost.txt
        let hasMulti = isMulti(propObj);
        let mod;
        const par = item[`par${propNum}`];
        const min = parseInt(item[`min${propNum}`]);
        const max = parseInt(item[`max${propNum}`]);
        if (hasStat && !hasMulti) {
          const itemStatObj = Object.assign(
            {},
            itemStat.find((obj) => obj.Stat === propObj.stat1)
          );

          if (itemStatObj.descval && itemStatObj.descval === "0") {
            mod = descval0(itemStatObj, val, par, min, max);
          }
          if (itemStatObj.descval && itemStatObj.descval === "1") {
            mod = descval1(itemStatObj, val, par, min, max);
          }
          if (itemStatObj.descval && itemStatObj.descval === "2") {
            mod = descval2(itemStatObj, val, par, min, max);
          }
          if (itemStatObj.descval === undefined && itemStatObj.Stat !== undefined) {
            mod = nodescval(itemStatObj, val, par, min, max);
          }
        }
        if (!hasStat) {
          const propCode = propObj.code;
          mod = fixStat(propCode, min, max);
        }
        if (hasStat && hasMulti) {
          mod = handleMulti(propObj, min, max);
        }
        acc[`stat${propNum}`] = mod;
      }
      return acc;
    }, {});

    const modArr = Object.entries(item_mods)
      .map(([key, val]) => val)
      .filter((val) => val);
    return {
      name: item_name,
      base_code: item_base_code,
      base_name,
      level_requirement: level_requirement,
      mods: modArr,
    };
  });
};
