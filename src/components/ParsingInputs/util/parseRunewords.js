import allStrings from "../json/allStrings.json";
import { classSkillUtil } from "../util/classSkillUtil";
import { descFuncUtil } from "../util/descFuncs";
import { isMissingData, fixRwStat } from "../util/fixMissing";
import treeIds from "../json/skilltab.json";
import skillIds from "../json/skillIds.json";
import runes from "../json/runes.json";

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
  let result2 = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i] === "weap") {
      result2.push("weapon");
    } else if (result[i] === "tors") {
      result2.push("body armor");
    } else if (result[i] === "miss") {
      result2.push("bow");
      result.push("crossbow");
    } else if (result[i] === "mele") {
      result2.push("melee");
    } else if (result[i] === "pala") {
      result2.push("pally shield");
    } else if (result[i] === "staf") {
      result2.push("staff");
    } else if (result[i] === "h2h") {
      result2.push("claw");
    } else if (result[i] === "pole") {
      result2.push("polearm");
    } else if (result[i] === "scep") {
      result2.push("scepter");
    } else if (result[i] === "hamm") {
      result2.push("hammer");
    } else if (result[i] === "shld") {
      result2.push("shield");
    } else if (result[i] === "swor") {
      result2.push("sword");
    } else {
      result2.push(result[i]);
    }
  }
  return result2;
};

const getLevelReq = (item) => {
  let result = [];
  let runeString = "";
  if (item.hasOwnProperty("Rune1")) {
    const runeCode = item["Rune1"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune2")) {
    const runeCode = item["Rune2"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune3")) {
    const runeCode = item["Rune3"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune4")) {
    const runeCode = item["Rune4"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune5")) {
    const runeCode = item["Rune5"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  if (item.hasOwnProperty("Rune6")) {
    const runeCode = item["Rune6"];
    const foundRune = runes.find((obj) => obj.code === runeCode);
    runeString += `${foundRune.name} `;
    result.push(parseInt(foundRune.levelreq));
  }
  result.sort((a, b) => b - a);
  return {
    level_requirement: result[0],
    rune_string: runeString,
    required_sockets: result.length,
  };
};

export const parseRunewords = (runewords, item_stat, properties) => {
  return runewords.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.Name);
    const item_name =
      str_obj_name !== undefined ? str_obj_name.str : item["Rune Name"];
    const base_types = defineItemTypes(item);
    const lvlAndSockets = getLevelReq(item);
    const level_requirement = lvlAndSockets.level_requirement;
    const socket_requirement = lvlAndSockets.required_sockets;
    const rune_string = lvlAndSockets.rune_string.trim();
    const property_strings = [];

    const itemMods = Object.entries(item).reduce((acc, [key, val]) => {
      if (key.includes("Code")) {
        // handling for inconsistencies/missing data in files
        if (isMissingData(val)) {
          const propNum = key.slice(6);
          const fixed = fixRwStat(val, item, propNum);
          acc[fixed.key] = {
            min: fixed.min,
            max: fixed.max,
          };
          property_strings.push({ order: "160", string: fixed.string });
        } else {
          const propNum = key.slice(6);

          let propObj = Object.assign(
            {},
            properties.find((obj) => obj.code === val)
          );
          let itemStatObj = Object.assign(
            {},
            item_stat.find((obj) => obj.Stat === propObj.stat1)
          );
          if (val === "pois-len") {
            console.log(`${item.index} has pois-len`);
          } else if (val === "indestruct") {
            property_strings.push({ order: "160", string: "Indestructible" });
          } else if (val === "ethereal") {
            property_strings.push({ order: "160", string: "Ethereal" });
          } else if (propObj === undefined) {
            console.log(item);
          } else if (itemStatObj === undefined) {
            // console.log(item);
            console.log(propObj.code);
          } else if (itemStatObj.Stat === "item_addclassskills") {
            const classResult = classSkillUtil(
              val,
              item[`T1Min${propNum}`],
              item[`T1Max${propNum}`]
            );
            acc[classResult.key] = {
              min: classResult.min,
              max: classResult.max,
            };
            property_strings.push({ order: "150", string: classResult.string });
          }
          // handling for generic +skill types, class independent
          else if (itemStatObj.Stat === "item_elemskill") {
            const min = parseInt(item[`T1Min${propNum}`]);
            const max = parseInt(item[`T1Max${propNum}`]);
            let objVal = propObj["*desc"];
            if (objVal === undefined) {
              objVal = "Fire Skills";
            }
            const key = objVal.toLowerCase().replace(/ /g, "_");
            acc[key] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${min}-${max} to ${objVal}`
                : `+${min} to ${objVal}`;
            property_strings.push({ order: "157", string: string });
          }
          // sockets as affix
          else if (itemStatObj.Stat === "item_numsockets") {
            if (item[`T1Min${propNum}`] === undefined) {
              const newVal = parseInt(item[`T1Param${propNum}`]);
              acc["item_numsockets"] = {
                min: newVal,
                max: newVal,
              };
              property_strings.push({
                order: "0",
                string: `Sockets (${newVal})`,
              });
            } else {
              const min = parseInt(item[`T1Min${propNum}`]);
              const max = parseInt(item[`T1Max${propNum}`]);
              acc["item_numsockets"] = {
                min: min,
                max: max,
              };
              const string =
                min !== max ? `Sockets (${min}-${max})` : `Sockets (${min})`;
              property_strings.push({ order: "0", string: string });
            }
          }
          // skills
          else if (
            itemStatObj.Stat === "item_singleskill" ||
            itemStatObj.Stat === "item_nonclassskill"
          ) {
            let found = skillIds.find(
              (s) => s.Id === item[`T1Param${propNum}`]
            );
            let skillName = "";
            if (found === undefined) {
              skillName = item[`T1Param${propNum}`];
            } else {
              skillName = found.skill;
            }
            const min = item[`T1Min${propNum}`];
            const max = item[`T1Max${propNum}`];
            const key = skillName.toLowerCase().replace(/ /g, "_");
            acc[key] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const stringObj = descFuncUtil(
              itemStatObj,
              allStrings,
              min,
              max,
              skillName
            );
            property_strings.push(stringObj);
          }
          // skill trees
          else if (itemStatObj.Stat === "item_addskill_tab") {
            let found = treeIds.find((s) => s.Id === item[`T1Param${propNum}`]);
            let treeName = "";
            if (found === undefined) {
              treeName = item[`T1Param${propNum}`];
            } else {
              treeName = found.skill;
            }
            const min = item[`T1Min${propNum}`];
            const max = item[`T1Max${propNum}`];
            const key = treeName.toLowerCase().replace(/ /g, "_");
            acc[key] = {
              min: parseInt(min),
              max: parseInt(max),
            };

            const stringObj = descFuncUtil(
              itemStatObj,
              allStrings,
              min,
              max,
              treeName
            );
            property_strings.push(stringObj);
          } else if (itemStatObj.Stat === undefined) {
            console.log("prop with * commenting in column value");
          } else if (
            itemStatObj.Stat.includes("perlevel") &&
            itemStatObj.Stat.includes("item_tohit") === false
          ) {
            let min = parseInt(item[`T1Min${propNum}`]) / 8;
            let max = parseInt(item[`T1Max${propNum}`]) / 8;
            if (min === undefined || isNaN(min)) {
              min = parseInt(item[`T1Param${propNum}`]) / 8;
              max = parseInt(item[`T1Param${propNum}`]) / 8;
            }
            const name = itemStatObj.Stat;
            const skillName = "";
            acc[name] = {
              min: min,
              max: max,
            };
            const stringObj = descFuncUtil(
              itemStatObj,
              allStrings,
              min,
              max,
              skillName
            );
            property_strings.push(stringObj);
          }
          //
          else if (
            itemStatObj.Stat.includes("perlevel") &&
            itemStatObj.Stat.includes("item_tohit")
          ) {
            let min = parseInt(item[`T1Min${propNum}`]) / 2;
            let max = parseInt(item[`T1Max${propNum}`]) / 2;
            if (min === undefined || isNaN(min)) {
              min = parseInt(item[`T1Param${propNum}`]) / 2;
              max = parseInt(item[`T1Param${propNum}`]) / 2;
            }
            const name = itemStatObj.Stat;
            const skillName = "";
            acc[name] = {
              min: min,
              max: max,
            };
            const stringObj = descFuncUtil(
              itemStatObj,
              allStrings,
              min,
              max,
              skillName
            );
            property_strings.push(stringObj);
          } else {
            const name = itemStatObj.Stat;
            let skillName = "";
            if (
              itemStatObj.Stat === "item_charged_skill" ||
              itemStatObj.descfunc === "15" ||
              itemStatObj.descfunc === "16"
            ) {
              let found = skillIds.find(
                (s) => s.Id === item[`T1Param${propNum}`]
              );
              if (found === undefined) {
                skillName = item[`T1Param${propNum}`];
              } else {
                skillName = found.skill;
              }
            }
            const min = parseInt(item[`T1Min${propNum}`]);
            const max = parseInt(item[`T1Max${propNum}`]);
            acc[name] = {
              min: min,
              max: max,
            };
            const stringObj = descFuncUtil(
              itemStatObj,
              allStrings,
              min,
              max,
              skillName
            );
            property_strings.push(stringObj);
          }
        }
      }
      // need to skip item_undeaddamage_percent to combine values with bases
      // figure out handling for mods with multiple stats
      return acc;
    }, {});
    let fixPropStrings = property_strings.filter((str) => str.string !== "");
    fixPropStrings.sort((a, b) => b.order - a.order);
    return {
      item_name,
      rune_string,
      base_types,
      level_requirement,
      socket_requirement,
      item_mods: { ...itemMods },
      property_strings: [...fixPropStrings],
    };
  });
};
