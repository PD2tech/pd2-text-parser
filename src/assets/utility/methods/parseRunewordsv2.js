import itemStat from "../../reference/itemstat.json";
import properties from "../../reference/properties.json";
import allStrings from "../json/allStrings.json";
import runes from "../json/runes.json";
import gems from "../json/gems.json";
import { descval0 } from "../descfuncs/descval0";
import { descval1 } from "../descfuncs/descval1";
import { descval2 } from "../descfuncs/descval2";
import { nodescval } from "../descfuncs/nodescval";
import { fixStat } from "../descfuncs/fixStat";
import { handleMulti } from "../descfuncs/handleMulti";

const defineItemTypes = (item) => {
  let result = [];
  if (item.hasOwnProperty("itype1")) {
    result.push(item["itype1"]);
  }
  if (item.hasOwnProperty("itype2")) {
    result.push(item["itype2"]);
  }
  if (item.hasOwnProperty("itype3")) {
    result.push(item["itype3"]);
  }
  let runeModTypes = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i] === "weap") {
      runeModTypes.push("weapon");
    } else if (result[i] === "tors") {
      runeModTypes.push("armor");
    } else if (result[i] === "miss") {
      runeModTypes.push("weapon");
    } else if (result[i] === "mele") {
      runeModTypes.push("weapon");
    } else if (result[i] === "pala") {
      runeModTypes.push("shield");
    } else if (result[i] === "staf") {
      runeModTypes.push("weapon");
    } else if (result[i] === "h2h") {
      runeModTypes.push("weapon");
    } else if (result[i] === "pole") {
      runeModTypes.push("weapon");
    } else if (result[i] === "scep") {
      runeModTypes.push("weapon");
    } else if (result[i] === "hamm") {
      runeModTypes.push("weapon");
    } else if (result[i] === "shld") {
      runeModTypes.push("shield");
    } else if (result[i] === "swor") {
      runeModTypes.push("weapon");
    } else if (result[i] === "helm") {
      runeModTypes.push("armor");
    } else if (result[i] === "spea") {
      runeModTypes.push("weapon");
    } else {
      runeModTypes.push("weapon");
    }
  }
  const removeDups = [...new Set(runeModTypes)];
  return { base_types: result, mod_types: removeDups };
};

const getRuneProps = (item) => {
  let socketResults = [];
  let runeString = "";
  let runeRecipe = [];
  if (item.hasOwnProperty("Rune1")) {
    const runeCode = item["Rune1"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune2")) {
    const runeCode = item["Rune2"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune3")) {
    const runeCode = item["Rune3"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune4")) {
    const runeCode = item["Rune4"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune5")) {
    const runeCode = item["Rune5"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune6")) {
    const runeCode = item["Rune6"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    runeRecipe.push(`${foundRune.code}`);
    socketResults.push(parseInt(foundRune.levelreq));
  }
  socketResults.sort((a, b) => b - a);
  const removeDups = [...new Set(runeRecipe)];
  return {
    level_requirement: socketResults[0],
    rune_string: runeString,
    required_sockets: socketResults.length,
    rune_recipe: removeDups,
  };
};

const isStat = (propObj) => {
  return Object.keys(propObj).includes("stat1");
};
const isMulti = (propObj) => {
  return Object.keys(propObj).includes("stat2");
};

export const parseRunewords = (runewords) => {
  return runewords.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.Name);
    const item_name = str_obj_name !== undefined ? str_obj_name.str : item["Rune Name"];
    const itemTypes = defineItemTypes(item);
    const base_types = itemTypes.base_types;
    const runeModTypes = itemTypes.mod_types;
    const runeProps = getRuneProps(item);
    const level_requirement = runeProps.level_requirement;
    const socket_requirement = runeProps.required_sockets;
    const rune_string = runeProps.rune_string.trim();
    const rune_recipe = runeProps.rune_recipe;
    const item_mods = Object.entries(item).reduce((acc, [key, val]) => {
      if (key.includes("T1Code") && val !== "" && !val.includes("*")) {
        const propNum = key.slice(6);
        const propObj = Object.assign(
          {},
          properties.find((obj) => obj.code === val)
        );
        let hasStat = isStat(propObj);
        let hasMulti = isMulti(propObj);
        let mod;
        const par = item[`T1Param${propNum}`];
        const min = parseInt(item[`T1Min${propNum}`]);
        const max = parseInt(item[`T1Max${propNum}`]);
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

    let rune_item_mods = [];
    rune_recipe.forEach((code) => {
      const rune = Object.assign(
        {},
        gems.find((obj) => obj.code === code)
      );
      for (let i = 0; i < runeModTypes.length; i++) {
        const type = runeModTypes[i];
        let propCode;
        let propObj;
        let par;
        let min;
        let max;
        if (type === "weapon") {
          propCode = rune["weaponMod1Code"];
          par = rune["weaponMod1Param"];
          min = parseInt(rune["weaponMod1Min"]);
          max = parseInt(rune["weaponMod1Max"]);
        }
        if (type === "armor") {
          propCode = rune["helmMod1Code"];
          par = rune["helmMod1Param"];
          min = parseInt(rune["helmMod1Min"]);
          max = parseInt(rune["helmMod1Max"]);
        }
        if (type === "shield") {
          propCode = rune["shieldMod1Code"];
          par = rune["shieldMod1Param"];
          min = parseInt(rune["shieldMod1Min"]);
          max = parseInt(rune["shieldMod1Max"]);
        }
        propObj = Object.assign(
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
        rune_item_mods.push({ type: type, ...mod });
      }
    });

    const modArr = Object.entries(item_mods)
      .map(([key, val]) => val)
      .filter((val) => val);
    return {
      name: item_name,
      rune_string,
      bases: base_types,
      props: {
        rune_recipe: rune_recipe,
        level_req: level_requirement,
        sock_req: socket_requirement,
      },
      stats: modArr,
      sockets: rune_item_mods,
    };
  });
};
