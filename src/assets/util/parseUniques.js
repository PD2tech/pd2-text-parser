import allStrings from "../json/allStrings.json";
import skills from "../json/skillIds.json";
import uniqueItems from "../json/uniqueItems.json";
import properties from "../json/properties.json";
import itemstat from "../json/itemstat.json";
import { descfuncStr1, descfuncStr2, descfuncCustom } from "./descfuncs";
import { classDescfunc } from "./classdescfuncs";

export const parseItems = () => {
  return uniqueItems.map((item) => {
    // finds an object from allStrings.json where the string object id matches the item index from uniqueItems (for item name like Mara's).
    const str_obj_name = allStrings.find((str) => str.id === item.index);
    // if no object is found, just sets the name as the item index
    const item_name =
      str_obj_name !== undefined ? str_obj_name.str : item.index;
    // finds object in allStrings.json where the string object id matches the item code (for item base like Berseker Axe)
    const str_obj_base = allStrings.find((str) => str.id === item.code);
    // if no object is found, just sets the base as the item code
    const item_base = str_obj_base !== undefined ? str_obj_base.str : item.code;
    // level requirement for unique item
    const level_requirement = parseInt(item["lvl req"]);
    // start of property strings array for descriptions of mods
    const property_strings = [];
    const entries = Object.entries(item);

    const reduced = entries.reduce((acc, [key, val]) => {
      if (key.includes("prop")) {
        // matches prop columns from uniques with the property code from properties.json
        // and finds the property object
        let newPropName = properties.find((prop) => prop.code === val);
        // cuts off "prop" to get the number to use for maching other columns from uniques
        const propNum = key.slice(4);
        // some property names have to be added themselves like class skill trees
        if (newPropName !== undefined) {
          // Amazon
          if (val === "ama") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["amazon_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Assassin
          else if (val === "ass") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["assassin_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Barbarian
          else if (val === "bar") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["barbarian_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Druid
          else if (val === "dru") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["druid_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Necromancer
          else if (val === "nec") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["necromancer_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Paladin
          else if (val === "pal") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["paladin_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // Sorceress
          else if (val === "sor") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["sorceress_skills"] = {
              min: parseInt(min),
              max: parseInt(max),
            };
            const string = classDescfunc(val, min, max);
            property_strings.push({ order: "150", string: string });
          }
          // aura on item
          else if (val === "aura") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            const skill = item[`par${propNum}`];
            acc["aura"] = {
              min: parseInt(min),
              max: parseInt(max),
              skill: skill.toLowerCase().replace(/ /g, "_"),
            };
            const string =
              min !== max
                ? `+${min}-${max} ${skill} When Equipped`
                : `+${min} ${skill} When Equipped`;
            property_strings.push({ order: "159", string: string });
          }
          // chance to cast
          else if (
            val === "hit-skill" ||
            val === "gethit-skill" ||
            val === "att-skill" ||
            val === "kill-skill" ||
            val === "death-skill" ||
            val === "levelup-skill"
          ) {
            const found = skills.find(
              (skill) => skill.Id === item[`par${propNum}`]
            );
            let type_string = "";
            if (val === "hit-skill") {
              type_string = "On Striking";
            } else if (val === "gethit-skill") {
              type_string = "When Struck";
            } else if (val === "att-skill") {
              type_string = "On Attack";
            } else if (val === "kill-skill") {
              type_string = "When You Kill An Enemy";
            } else if (val === "death-skill") {
              type_string = "When You Die";
            } else if (val === "levelup-skill") {
              type_string = "When You Level Up";
            }
            if (found === undefined) {
              newPropName = val.toLowerCase().replace(/-/g, "_");
              const skill = item[`par${propNum}`]
                .toLowerCase()
                .replace(/ /g, "_");
              const ctc = item[`min${propNum}`];
              const lvl = item[`max${propNum}`];
              acc[newPropName] = {
                chance_to_cast: parseInt(ctc),
                skill_level: parseInt(lvl),
                skill: skill,
              };
              const string = `${ctc}% Chance To Cast Level ${lvl} ${
                item[`par${propNum}`]
              } ${type_string}`;
              property_strings.push({ order: "160", string: string });
            } else {
              newPropName = val.toLowerCase().replace(/-/g, "_");
              const skill = found.skill.toLowerCase().replace(/ /g, "_");
              const ctc = item[`min${propNum}`];
              const lvl = item[`max${propNum}`];
              acc[newPropName] = {
                chance_to_cast: parseInt(ctc),
                skill_level: parseInt(lvl),
                skill: skill,
              };
              const string = `${ctc}% Chance To Cast Level ${lvl} ${found.skill} ${type_string}`;
              property_strings.push({ order: "160", string: string });
            }
          }
          // individual skills or skill trees
          else if (val === "skill") {
            const found = skills.find(
              (skill) => skill.Id === item[`par${propNum}`]
            );
            // if undefined because some columns have the skill name for the parameter
            if (found === undefined) {
              newPropName = item[`par${propNum}`]
                .toLowerCase()
                .replace(/ /g, "_");
              const min = item[`min${propNum}`];
              const max = item[`max${propNum}`];
              acc[newPropName] = {
                min: parseInt(min),
                max: parseInt(max),
              };
              const string =
                min !== max
                  ? `+${min}-${max} To ${item[`par${propNum}`]}`
                  : `+${min} To ${item[`par${propNum}`]}`;
              property_strings.push({ order: "81", string: string });
            }
            // if it isn't undefined, finds the skill with the id from parameter
            else {
              newPropName = found.skill.toLowerCase().replace(/ /g, "_");
              const min = item[`min${propNum}`];
              const max = item[`max${propNum}`];
              acc[newPropName] = {
                min: parseInt(min),
                max: parseInt(max),
              };
              const string =
                min !== max
                  ? `+${min}-${max} To ${found.skill}`
                  : `+${min} To ${found.skill}`;
              property_strings.push({ order: "81", string: string });
            }
          }
          // individual properties
          // if the property object does have a stat1 value
          else if (newPropName.stat1 !== undefined) {
            newPropName = newPropName.stat1;
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            // have to do some math for the per level mods
            let val = 0;
            // per level properties don't have the min and max values
            if (min === undefined && max === undefined) {
              // attack rating per level mods parameters have to be divided by 2
              if (
                newPropName === "item_tohit_perlevel" ||
                newPropName === "item_tohit_undead_perlevel" ||
                newPropName === "item_tohit_demon_perlevel"
              ) {
                val = val = parseInt(item[`par${propNum}`]) / 2;
              }
              // the other per level mod parameters are divided by 8
              else {
                val = parseInt(item[`par${propNum}`]) / 8;
              }
              if (
                newPropName === "item_find_gold_perlevel" ||
                newPropName === "item_find_magic_perlevel" ||
                newPropName === "item_strength_perlevel" ||
                newPropName === "item_dexterity_perlevel" ||
                newPropName === "item_energy_perlevel" ||
                newPropName === "item_vitality_perlevel" ||
                newPropName === "item_armor_perlevel" ||
                newPropName === "item_hp_perlevel" ||
                newPropName === "item_mana_perlevel" ||
                newPropName === "item_maxdamage_perlevel" ||
                newPropName === "item_maxdamage_percent_perlevel" ||
                newPropName === "item_tohit_perlevel" ||
                newPropName === "item_tohit_undead_perlevel" ||
                newPropName === "item_damage_undead_perlevel" ||
                newPropName === "item_tohit_demon_perlevel" ||
                newPropName === "item_deadlystrike_perlevel" ||
                newPropName === "item_resist_ltng_perlevel" ||
                newPropName === "item_damage_demon_perlevel" ||
                newPropName === "item_stamina_perlevel" ||
                newPropName === "item_thorns_perlevel" ||
                newPropName === "item_absorb_fire_perlevel" ||
                newPropName === "item_absorb_cold_perlevel"
              ) {
                acc[newPropName] = {
                  min: val,
                  max: val,
                };
              }
            }
            // ************ need to revisit the sockets ************
            else if (newPropName === "item_numsockets") {
              if (min === undefined && max === undefined) {
                const min = item[`par${propNum}`];
                const max = item[`par${propNum}`];
                acc[newPropName] = {
                  min: parseInt(min),
                  max: parseInt(max),
                };
                const string =
                  min !== max
                    ? `Sockets (${min}-${max})`
                    : `Sockets (${item[`par${propNum}`]})`;
                property_strings.push({ order: "0", string: string });
              } else {
                acc[newPropName] = {
                  min: parseInt(min),
                  max: parseInt(max),
                };
                const string =
                  min !== max ? `Sockets (${min}-${max})` : `Sockets (${min})`;
                property_strings.push({ order: "0", string: string });
              }
            }
            // skill charges
            else if (newPropName === "item_charged_skill") {
              const found = skills.find(
                (skill) => skill.Id === item[`par${propNum}`]
              );
              // if the skill isn't found by id then the skill name is the parameter
              if (found === undefined) {
                acc[newPropName] = {
                  skill: item[`par${propNum}`],
                  charges: parseInt(min),
                  skill_level: parseInt(max),
                };
                const string = `Level ${max} ${
                  item[`par${propNum}`]
                } (${min} Charges)`;
                property_strings.push({ order: "1", string: string });
              }
              // otherwise, use the found skill name by the id
              else {
                acc[newPropName] = {
                  skill: found.skill,
                  charges: parseInt(min),
                  skill_level: parseInt(max),
                };
                const string = `Level ${max} ${found.skill} (${min} Charges)`;
                property_strings.push({ order: "1", string: string });
              }
            } else {
              acc[newPropName] = {
                min: parseInt(min),
                max: parseInt(max),
              };
            }
            // has descstr, descfun, descpriority
            const itemstatObj = itemstat.find(
              (obj) => obj.Stat === newPropName
            );

            if (itemstatObj !== undefined) {
              const foundString = allStrings.find(
                (str) => str.id === itemstatObj.descstrpos
              );
              let itemStrOrder = itemstatObj.descpriority;
              if (itemStrOrder === undefined) {
                itemStrOrder = 0;
              }
              if (foundString !== undefined) {
                //
                if (itemstatObj.descval === "0") {
                  property_strings.push({
                    order: itemStrOrder,
                    string: foundString.str,
                  });
                } else if (itemstatObj.descval === "1") {
                  // have to remove undead and add string/value in with combined bases because of modifer on blunt weapons
                  if (newPropName !== "item_undeaddamage_percent") {
                    const string = descfuncStr1(
                      itemstatObj.descfunc,
                      min,
                      max,
                      foundString.str,
                      val
                    );
                    property_strings.push({
                      order: itemStrOrder,
                      string: string,
                    });
                  }
                } else if (itemstatObj.descval === "2") {
                  const string = descfuncStr2(
                    itemstatObj.descfunc,
                    min,
                    max,
                    foundString.str,
                    val
                  );
                  property_strings.push({
                    order: itemStrOrder,
                    string: string,
                  });
                } else {
                  console.log(foundString.str);
                }
              }
            } else {
              // custom added property naming handling
              const string = descfuncCustom(newPropName, min, max);
              property_strings.push({ order: "159", string: string });
            }
          } else {
            newPropName = val;
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc[newPropName] = {
              min: parseInt(min),
              max: parseInt(max),
            };

            if (val === "indestruct") {
              property_strings.push({ order: "160", string: "Indestructible" });
            } else if (val === "ethereal") {
              property_strings.push({ order: "160", string: "Ethereal" });
            } else {
              console.log(val);
            }
          }
        }
      }
      return acc;
    }, {});
    property_strings.sort((a, b) => b.order - a.order);
    return {
      item_name,
      item_base,
      level_requirement,
      item_mods: { ...reduced },
      property_strings,
    };
  });
};
