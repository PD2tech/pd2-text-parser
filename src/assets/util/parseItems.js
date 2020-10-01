import allStrings from "../json/allStrings.json";
import skills from "../json/skillIds.json";
import uniqueItems from "../json/uniqueItems.json";
import properties from "../json/properties.json";
import itemstat from "../json/itemstat.json";
import { descfuncStr1, descfuncStr2, descfuncCustom } from "./descfuncs";

// import { itemstat } from "../text/itemstat";

// turn into JSON
// export const parseToJson = () => {
//   const lines = itemstat.split("\n");
//   let firstResult = [];
//   const headers = lines[0].split(",");

//   // converts csv data into objects
//   for (let i = 1; i < lines.length; i++) {
//     let obj = {};
//     const currentline = lines[i].split(",");

//     for (let j = 0; j < headers.length; j++) {
//       const val = currentline[j];
//       if (val !== "") {
//         obj[headers[j]] = currentline[j];
//       }
//     }

//     firstResult.push(obj);
//   }
//   return firstResult;
// };

// code === str-id get str value
// if key contains prop and key's value === skill, find skill name by par === skill id

export const parseItems = () => {
  return uniqueItems.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.index);
    const item_name =
      str_obj_name !== undefined ? str_obj_name.str : item.index;
    const str_obj_base = allStrings.find((str) => str.id === item.code);
    const item_base = str_obj_base !== undefined ? str_obj_base.str : item.code;

    const property_strings = [];
    const entries = Object.entries(item);
    const reduced = entries.reduce((acc, [key, val]) => {
      if (key.includes("prop")) {
        let newPropName = properties.find((prop) => prop.code === val);
        const propNum = key.slice(4);

        if (newPropName !== undefined) {
          // property naming for class skills

          // Amazon
          if (val === "ama") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["amazon_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Amazon Skill Levels`
                : `+${item[`min${propNum}`]} to Amazon Skill Levels`;
            property_strings.push(string);
          }
          // Assassin
          else if (val === "ass") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["assassin_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Assassin Skill Levels`
                : `+${item[`min${propNum}`]} to Assassin Skill Levels`;
            property_strings.push(string);
          }
          // Barbarian
          else if (val === "bar") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["barbarian_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Barbarian Skill Levels`
                : `+${item[`min${propNum}`]} to Barbarian Skill Levels`;
            property_strings.push(string);
          }
          // Druid
          else if (val === "dru") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["druid_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Druid Skill Levels`
                : `+${item[`min${propNum}`]} to Druid Skill Levels`;
            property_strings.push(string);
          }
          // Necromancer
          else if (val === "nec") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["necromancer_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Necromancer Skill Levels`
                : `+${item[`min${propNum}`]} to Necromancer Skill Levels`;
            property_strings.push(string);
          }
          // Paladin
          else if (val === "pal") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["paladin_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Paladin Skill Levels`
                : `+${item[`min${propNum}`]} to Paladin Skill Levels`;
            property_strings.push(string);
          }
          // Sorceress
          else if (val === "sor") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc["sorceress_skills"] = {
              min: min,
              max: max,
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } to Sorceress Skill Levels`
                : `+${item[`min${propNum}`]} to Sorceress Skill Levels`;
            property_strings.push(string);
          }
          // aura on item
          else if (val === "aura") {
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            const skill = item[`par${propNum}`];
            acc["aura"] = {
              min: min,
              max: max,
              skill: skill.toLowerCase().replace(/ /g, "_"),
            };
            const string =
              min !== max
                ? `+${item[`min${propNum}`]}-${
                    item[`max${propNum}`]
                  } ${skill} When Equipped`
                : `+${item[`min${propNum}`]} ${skill} When Equipped`;
            property_strings.push(string);
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
                chance_to_cast: ctc,
                skill_level: lvl,
                skill: skill,
              };
              const string = `${ctc}% Chance To Cast Level ${lvl} ${
                item[`par${propNum}`]
              } ${type_string}`;
              property_strings.push(string);
            } else {
              newPropName = val.toLowerCase().replace(/-/g, "_");
              const skill = found.skill.toLowerCase().replace(/ /g, "_");
              const ctc = item[`min${propNum}`];
              const lvl = item[`max${propNum}`];
              acc[newPropName] = {
                chance_to_cast: ctc,
                skill_level: lvl,
                skill: skill,
              };
              const string = `${ctc}% Chance To Cast Level ${lvl} ${found.skill} ${type_string}`;
              property_strings.push(string);
            }
          }
          // individual skills or skill trees
          else if (val === "skill") {
            const found = skills.find(
              (skill) => skill.Id === item[`par${propNum}`]
            );
            if (found === undefined) {
              newPropName = item[`par${propNum}`]
                .toLowerCase()
                .replace(/ /g, "_");
              const min = item[`min${propNum}`];
              const max = item[`max${propNum}`];
              acc[newPropName] = {
                min: min,
                max: max,
              };
              const string =
                min !== max
                  ? `+${min}-${max} To ${item[`par${propNum}`]}`
                  : `+${min} To ${item[`par${propNum}`]}`;
              property_strings.push(string);
            } else {
              newPropName = found.skill.toLowerCase().replace(/ /g, "_");
              const min = item[`min${propNum}`];
              const max = item[`max${propNum}`];
              acc[newPropName] = {
                min: item[`min${propNum}`],
                max: item[`max${propNum}`],
              };
              const string =
                min !== max
                  ? `+${min}-${max} To ${found.skill}`
                  : `+${min} To ${found.skill}`;
              property_strings.push(string);
            }
          }
          // individual properties
          else if (newPropName.stat1 !== undefined) {
            newPropName = newPropName.stat1;
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            let val = 0;
            if (min === undefined && max === undefined) {
              if (
                newPropName === "item_tohit_perlevel" ||
                newPropName === "item_tohit_undead_perlevel" ||
                newPropName === "item_tohit_demon_perlevel"
              ) {
                val = val = parseInt(item[`par${propNum}`]) / 2;
              } else {
                val = parseInt(item[`par${propNum}`]) / 8;
              }
            }

            if (newPropName === "item_numsockets") {
              if (min === undefined && max === undefined) {
                acc[newPropName] = {
                  min: item[`par${propNum}`],
                  max: item[`par${propNum}`],
                };
              } else {
                acc[newPropName] = {
                  min: min,
                  max: max,
                };
              }
            } else if (
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
            // skill charges
            else if (newPropName === "item_charged_skill") {
              const found = skills.find(
                (skill) => skill.Id === item[`par${propNum}`]
              );
              if (found === undefined) {
                acc[newPropName] = {
                  skill: item[`par${propNum}`],
                  charges: min,
                  skill_level: max,
                };
                const string = `Level ${max} ${
                  item[`par${propNum}`]
                } (${min} Charges)`;
                property_strings.push(string);
              } else {
                acc[newPropName] = {
                  skill: found.skill,
                  charges: min,
                  skill_level: max,
                };
                const string = `Level ${max} ${found.skill} (${min} Charges)`;
                property_strings.push(string);
              }
            } else {
              acc[newPropName] = {
                min: min,
                max: max,
              };
            }

            const itemstatObj = itemstat.find(
              (obj) => obj.Stat === newPropName
            );
            if (newPropName === "item_numsockets") {
              const string =
                min !== max
                  ? `Sockets (${min}-${max})`
                  : `Sockets (${item[`par${propNum}`]})`;
              property_strings.push(string);
            } else if (itemstatObj !== undefined) {
              const foundString = allStrings.find(
                (str) => str.id === itemstatObj.descstrpos
              );
              if (foundString !== undefined) {
                //
                if (itemstatObj.descval === "0") {
                  property_strings.push(foundString.str);
                } else if (itemstatObj.descval === "1") {
                  const string = descfuncStr1(
                    itemstatObj.descfunc,
                    min,
                    max,
                    foundString.str,
                    val
                  );
                  property_strings.push(string);
                } else if (itemstatObj.descval === "2") {
                  const string = descfuncStr2(
                    itemstatObj.descfunc,
                    min,
                    max,
                    foundString.str,
                    val
                  );
                  property_strings.push(string);
                } else {
                  // only skill charges left here
                  console.log(foundString.str);
                }
              }
            } else {
              // custom added property naming handling
              const string = descfuncCustom(newPropName, min, max);
              property_strings.push(string);
            }
          } else {
            newPropName = val;
            const min = item[`min${propNum}`];
            const max = item[`max${propNum}`];
            acc[newPropName] = {
              min: min,
              max: max,
            };

            if (val === "indestruct") {
              property_strings.push("Indestructible");
            } else if (val === "ethereal") {
              property_strings.push("Ethereal");
            } else if (val === "item_numsockets") {
              const string =
                min !== max ? `Sockets (${min}-${max})` : `Sockets (${min})`;
              property_strings.push(string);
            } else {
              console.log(val);
            }
          }
        }
      }
      return acc;
    }, {});
    return { item_name, item_base, ...reduced, property_strings };
  });
};
