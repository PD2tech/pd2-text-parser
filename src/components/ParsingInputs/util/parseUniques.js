import allStrings from "../json/allStrings.json";
import { classSkillUtil } from "../util/classSkillUtil";
import { descFuncUtil } from "../util/descFuncs";
import { isMissingData, fixStat } from "../util/fixMissing";
import treeIds from "../json/skilltab.json";
import skillIds from "../json/skillIds.json";

export const parseUniqueItems = (uniqueItems, item_stat, properties) => {
  return uniqueItems.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.index);
    const item_name =
      str_obj_name !== undefined ? str_obj_name.str : item.index;
    const itemBase = allStrings.find((str) => str.id === item.code);
    const item_base = itemBase.str;
    const item_base_code = item.code;
    const level_requirement = parseInt(item["lvl req"]);
    const property_strings = [];

    const itemMods = Object.entries(item).reduce((acc, [key, val]) => {
      if (key.includes("prop")) {
        // handling for inconsistencies/missing data in files
        if (isMissingData(val)) {
          const propNum = key.slice(4);
          const fixed = fixStat(val, item, propNum);
          acc[fixed.key] = {
            min: fixed.min,
            max: fixed.max,
          };
          property_strings.push({ order: "160", string: fixed.string });
        } else if (val === "skill-rand") {
          // needs to be made another utility for random class skill
          const propNum = key.slice(4);
          const value = parseInt(item[`par${propNum}`]);
          // skill id values/ranges
          let classname = "Druid";
          const min = parseInt(item[`min${propNum}`]);
          if (min === 36) {
            classname = "Sorceress";
          }
          acc["random_class_skill"] = {
            min: value,
            max: value,
          };
          property_strings.push({
            order: "81",
            string: `+${value} to Random ${classname} Skill`,
          });
        } else {
          const propNum = key.slice(4);

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
              item[`min${propNum}`],
              item[`max${propNum}`]
            );
            acc[classResult.key] = {
              min: classResult.min,
              max: classResult.max,
            };
            property_strings.push({ order: "150", string: classResult.string });
          }
          // handling for generic +skill types, class independent
          else if (itemStatObj.Stat === "item_elemskill") {
            const min = parseInt(item[`min${propNum}`]);
            const max = parseInt(item[`max${propNum}`]);
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
            if (item[`min${propNum}`] === undefined) {
              const newVal = parseInt(item[`par${propNum}`]);
              acc["item_numsockets"] = {
                min: newVal,
                max: newVal,
              };
              property_strings.push({
                order: "0",
                string: `Sockets (${newVal})`,
              });
            } else {
              const min = parseInt(item[`min${propNum}`]);
              const max = parseInt(item[`max${propNum}`]);
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
            let found = skillIds.find((s) => s.Id === item[`par${propNum}`]);
            let skillName = "";
            if (found === undefined) {
              skillName = item[`par${propNum}`];
            } else {
              skillName = found.skill;
            }
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
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
            let found = treeIds.find((s) => s.Id === item[`par${propNum}`]);
            let treeName = "";
            if (found === undefined) {
              treeName = item[`par${propNum}`];
            } else {
              treeName = found.skill;
            }
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
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
            let min = parseInt(item[`min${propNum}`]) / 8;
            let max = parseInt(item[`max${propNum}`]) / 8;
            if (min === undefined || isNaN(min)) {
              min = parseInt(item[`par${propNum}`]) / 8;
              max = parseInt(item[`par${propNum}`]) / 8;
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
            let min = parseInt(item[`min${propNum}`]) / 2;
            let max = parseInt(item[`max${propNum}`]) / 2;
            if (min === undefined || isNaN(min)) {
              min = parseInt(item[`par${propNum}`]) / 2;
              max = parseInt(item[`par${propNum}`]) / 2;
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
              let found = skillIds.find((s) => s.Id === item[`par${propNum}`]);
              if (found === undefined) {
                skillName = item[`par${propNum}`];
              } else {
                skillName = found.skill;
              }
            }
            const min = parseInt(item[`min${propNum}`]);
            const max = parseInt(item[`max${propNum}`]);
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
            if (name !== "item_undeaddamage_percent") {
              property_strings.push(stringObj);
            }
          }
        }
      }
      // figure out handling for mods with multiple stats
      return acc;
    }, {});
    let fixPropStrings = property_strings.filter((str) => str.string !== "");
    return {
      item_name,
      item_base,
      item_base_code,
      level_requirement,
      item_mods: { ...itemMods },
      property_strings: [...fixPropStrings],
    };
  });
};
