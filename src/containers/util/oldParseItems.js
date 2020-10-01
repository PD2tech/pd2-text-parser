import { uniqueItems } from "../json/uniqueitems";
import { parseSkillIds, parseProps } from "./parseSkillIds";

export const parseItems = () => {
  const skillIds = parseSkillIds();
  const allProps = parseProps();

  const lines = uniqueItems.split("\n");
  let firstResult = [];
  const headers = lines[0].split(",");

  // converts csv data into objects
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      const val = currentline[j];
      if (val !== "") {
        obj[headers[j]] = currentline[j];
      }
    }

    firstResult.push(obj);
  }

  let secondResult = [];
  // reformats the objects to my specs

  for (let k = 0; k < firstResult.length; k++) {
    const item = Object.entries(firstResult[k]);
    const newItem = item.reduce((acc, [key, val]) => {
      if (key === "index") {
        acc["item_name"] = val;
      } else if (key === "*type") {
        acc["item_base"] = val;
      } else if (key === "lvl") {
        acc["item_level"] = val;
      } else if (key === "lvl req") {
        acc["level_requirement"] = val;
      } else if (key === "rarity") {
        acc[key] = "unique";
      } else {
        acc[key] = val;
      }

      return acc;
    }, {});
    secondResult.push(newItem);
  }

  let thirdResult = [];
  for (let l = 0; l < secondResult.length; l++) {
    let itemObj = {};
    Object.assign(itemObj, {
      item_name: secondResult[l].item_name,
      item_base: secondResult[l].item_base,
      item_level: secondResult[l].item_level,
      level_requirement: secondResult[l].level_requirement,
      rarity: secondResult[l].rarity,
    });

    if (secondResult[l].hasOwnProperty("prop1")) {
      if (secondResult[l]["prop1"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par1"]);

        if (name === undefined) {
          let newName = secondResult[l]["par1"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min1,
              max: secondResult[l].max1,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min1,
              max: secondResult[l].max1,
            },
          });
        }
      } else if (
        secondResult[l]["prop1"] === "hit-skill" ||
        secondResult[l]["prop1"] === "gethit-skill" ||
        secondResult[l]["prop1"] === "att-skill" ||
        secondResult[l]["prop1"] === "kill-skill" ||
        secondResult[l]["prop1"] === "death-skill" ||
        secondResult[l]["prop1"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par1"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop1"]]: {
              chance_to_cast: secondResult[l].min1,
              skill_level: secondResult[l].max1,
              skill: secondResult[l]["par1"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop1"]]: {
              chance_to_cast: secondResult[l].min1,
              skill_level: secondResult[l].max1,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop1"]]: {
            min: secondResult[l].min1,
            max: secondResult[l].max1,
          },
        });
      }
    }

    if (secondResult[l].hasOwnProperty("prop2")) {
      if (secondResult[l]["prop2"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par2"]);

        if (name === undefined) {
          let newName = secondResult[l]["par2"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min2,
              max: secondResult[l].max2,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min2,
              max: secondResult[l].max2,
            },
          });
        }
      } else if (
        secondResult[l]["prop2"] === "hit-skill" ||
        secondResult[l]["prop2"] === "gethit-skill" ||
        secondResult[l]["prop2"] === "att-skill" ||
        secondResult[l]["prop2"] === "kill-skill" ||
        secondResult[l]["prop2"] === "death-skill" ||
        secondResult[l]["prop2"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par2"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop2"]]: {
              chance_to_cast: secondResult[l].min2,
              skill_level: secondResult[l].max2,
              skill: secondResult[l]["par2"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop2"]]: {
              chance_to_cast: secondResult[l].min2,
              skill_level: secondResult[l].max2,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop2"]]: {
            min: secondResult[l].min2,
            max: secondResult[l].max2,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop3")) {
      if (secondResult[l]["prop3"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par3"]);

        if (name === undefined) {
          let newName = secondResult[l]["par3"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min3,
              max: secondResult[l].max3,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min3,
              max: secondResult[l].max3,
            },
          });
        }
      } else if (
        secondResult[l]["prop3"] === "hit-skill" ||
        secondResult[l]["prop3"] === "gethit-skill" ||
        secondResult[l]["prop3"] === "att-skill" ||
        secondResult[l]["prop3"] === "kill-skill" ||
        secondResult[l]["prop3"] === "death-skill" ||
        secondResult[l]["prop3"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par3"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop3"]]: {
              chance_to_cast: secondResult[l].min3,
              skill_level: secondResult[l].max3,
              skill: secondResult[l]["par3"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop3"]]: {
              chance_to_cast: secondResult[l].min3,
              skill_level: secondResult[l].max3,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop3"]]: {
            min: secondResult[l].min3,
            max: secondResult[l].max3,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop4")) {
      if (secondResult[l]["prop4"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par4"]);

        if (name === undefined) {
          let newName = secondResult[l]["par4"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min4,
              max: secondResult[l].max4,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min4,
              max: secondResult[l].max4,
            },
          });
        }
      } else if (
        secondResult[l]["prop4"] === "hit-skill" ||
        secondResult[l]["prop4"] === "gethit-skill" ||
        secondResult[l]["prop4"] === "att-skill" ||
        secondResult[l]["prop4"] === "kill-skill" ||
        secondResult[l]["prop4"] === "death-skill" ||
        secondResult[l]["prop4"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par4"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop4"]]: {
              chance_to_cast: secondResult[l].min4,
              skill_level: secondResult[l].max4,
              skill: secondResult[l]["par4"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop4"]]: {
              chance_to_cast: secondResult[l].min4,
              skill_level: secondResult[l].max4,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop4"]]: {
            min: secondResult[l].min4,
            max: secondResult[l].max4,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop5")) {
      if (secondResult[l]["prop5"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par5"]);

        if (name === undefined) {
          let newName = secondResult[l]["par5"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min5,
              max: secondResult[l].max5,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min5,
              max: secondResult[l].max5,
            },
          });
        }
      } else if (
        secondResult[l]["prop5"] === "hit-skill" ||
        secondResult[l]["prop5"] === "gethit-skill" ||
        secondResult[l]["prop5"] === "att-skill" ||
        secondResult[l]["prop5"] === "kill-skill" ||
        secondResult[l]["prop5"] === "death-skill" ||
        secondResult[l]["prop5"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par5"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop5"]]: {
              chance_to_cast: secondResult[l].min5,
              skill_level: secondResult[l].max5,
              skill: secondResult[l]["par5"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop5"]]: {
              chance_to_cast: secondResult[l].min5,
              skill_level: secondResult[l].max5,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop5"]]: {
            min: secondResult[l].min5,
            max: secondResult[l].max5,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop6")) {
      if (secondResult[l]["prop6"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par6"]);

        if (name === undefined) {
          let newName = secondResult[l]["par6"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min6,
              max: secondResult[l].max6,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min6,
              max: secondResult[l].max6,
            },
          });
        }
      } else if (
        secondResult[l]["prop6"] === "hit-skill" ||
        secondResult[l]["prop6"] === "gethit-skill" ||
        secondResult[l]["prop6"] === "att-skill" ||
        secondResult[l]["prop6"] === "kill-skill" ||
        secondResult[l]["prop6"] === "death-skill" ||
        secondResult[l]["prop6"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par6"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop6"]]: {
              chance_to_cast: secondResult[l].min6,
              skill_level: secondResult[l].max6,
              skill: secondResult[l]["par6"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop6"]]: {
              chance_to_cast: secondResult[l].min6,
              skill_level: secondResult[l].max6,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop6"]]: {
            min: secondResult[l].min6,
            max: secondResult[l].max6,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop7")) {
      if (secondResult[l]["prop7"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par7"]);

        if (name === undefined) {
          let newName = secondResult[l]["par7"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min7,
              max: secondResult[l].max7,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min7,
              max: secondResult[l].max7,
            },
          });
        }
      } else if (
        secondResult[l]["prop7"] === "hit-skill" ||
        secondResult[l]["prop7"] === "gethit-skill" ||
        secondResult[l]["prop7"] === "att-skill" ||
        secondResult[l]["prop7"] === "kill-skill" ||
        secondResult[l]["prop7"] === "death-skill" ||
        secondResult[l]["prop7"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par7"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop7"]]: {
              chance_to_cast: secondResult[l].min7,
              skill_level: secondResult[l].max7,
              skill: secondResult[l]["par7"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop7"]]: {
              chance_to_cast: secondResult[l].min7,
              skill_level: secondResult[l].max7,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop7"]]: {
            min: secondResult[l].min7,
            max: secondResult[l].max7,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop8")) {
      if (secondResult[l]["prop8"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par8"]);

        if (name === undefined) {
          let newName = secondResult[l]["par8"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min8,
              max: secondResult[l].max8,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min8,
              max: secondResult[l].max8,
            },
          });
        }
      } else if (
        secondResult[l]["prop8"] === "hit-skill" ||
        secondResult[l]["prop8"] === "gethit-skill" ||
        secondResult[l]["prop8"] === "att-skill" ||
        secondResult[l]["prop8"] === "kill-skill" ||
        secondResult[l]["prop8"] === "death-skill" ||
        secondResult[l]["prop8"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par8"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop8"]]: {
              chance_to_cast: secondResult[l].min8,
              skill_level: secondResult[l].max8,
              skill: secondResult[l]["par8"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop8"]]: {
              chance_to_cast: secondResult[l].min8,
              skill_level: secondResult[l].max8,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop8"]]: {
            min: secondResult[l].min8,
            max: secondResult[l].max8,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop9")) {
      if (secondResult[l]["prop9"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par9"]);

        if (name === undefined) {
          let newName = secondResult[l]["par9"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min9,
              max: secondResult[l].max9,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min9,
              max: secondResult[l].max9,
            },
          });
        }
      } else if (
        secondResult[l]["prop9"] === "hit-skill" ||
        secondResult[l]["prop9"] === "gethit-skill" ||
        secondResult[l]["prop9"] === "att-skill" ||
        secondResult[l]["prop9"] === "kill-skill" ||
        secondResult[l]["prop9"] === "death-skill" ||
        secondResult[l]["prop9"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par9"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop9"]]: {
              chance_to_cast: secondResult[l].min9,
              skill_level: secondResult[l].max9,
              skill: secondResult[l]["par9"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop9"]]: {
              chance_to_cast: secondResult[l].min9,
              skill_level: secondResult[l].max9,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop9"]]: {
            min: secondResult[l].min9,
            max: secondResult[l].max9,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop10")) {
      if (secondResult[l]["prop10"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par10"]);
        if (name === undefined) {
          let newName = secondResult[l]["par10"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min10,
              max: secondResult[l].max10,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min10,
              max: secondResult[l].max10,
            },
          });
        }
      } else if (
        secondResult[l]["prop10"] === "hit-skill" ||
        secondResult[l]["prop10"] === "gethit-skill" ||
        secondResult[l]["prop10"] === "att-skill" ||
        secondResult[l]["prop10"] === "kill-skill" ||
        secondResult[l]["prop10"] === "death-skill" ||
        secondResult[l]["prop10"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par10"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop10"]]: {
              chance_to_cast: secondResult[l].min10,
              skill_level: secondResult[l].max10,
              skill: secondResult[l]["par10"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop10"]]: {
              chance_to_cast: secondResult[l].min10,
              skill_level: secondResult[l].max10,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop10"]]: {
            min: secondResult[l].min10,
            max: secondResult[l].max10,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop11")) {
      if (secondResult[l]["prop11"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par11"]);
        if (name === undefined) {
          let newName = secondResult[l]["par11"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min11,
              max: secondResult[l].max11,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min11,
              max: secondResult[l].max11,
            },
          });
        }
      } else if (
        secondResult[l]["prop11"] === "hit-skill" ||
        secondResult[l]["prop11"] === "gethit-skill" ||
        secondResult[l]["prop11"] === "att-skill" ||
        secondResult[l]["prop11"] === "kill-skill" ||
        secondResult[l]["prop11"] === "death-skill" ||
        secondResult[l]["prop11"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par11"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop11"]]: {
              chance_to_cast: secondResult[l].min11,
              skill_level: secondResult[l].max11,
              skill: secondResult[l]["par11"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop11"]]: {
              chance_to_cast: secondResult[l].min11,
              skill_level: secondResult[l].max11,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop11"]]: {
            min: secondResult[l].min11,
            max: secondResult[l].max11,
          },
        });
      }
    }
    if (secondResult[l].hasOwnProperty("prop12")) {
      if (secondResult[l]["prop12"] === "skill") {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par12"]);
        if (name === undefined) {
          let newName = secondResult[l]["par12"]
            .toLowerCase()
            .replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min12,
              max: secondResult[l].max12,
            },
          });
        } else {
          let newName = name.skill.toLowerCase().replace(/ /g, "_");
          Object.assign(itemObj, {
            [`char_${newName}`]: {
              min: secondResult[l].min12,
              max: secondResult[l].max12,
            },
          });
        }
      } else if (
        secondResult[l]["prop12"] === "hit-skill" ||
        secondResult[l]["prop12"] === "gethit-skill" ||
        secondResult[l]["prop12"] === "att-skill" ||
        secondResult[l]["prop12"] === "kill-skill" ||
        secondResult[l]["prop12"] === "death-skill" ||
        secondResult[l]["prop12"] === "levelup-skill"
      ) {
        const name = skillIds.find((s) => s.Id === secondResult[l]["par12"]);

        if (name === undefined) {
          Object.assign(itemObj, {
            [secondResult[l]["prop12"]]: {
              chance_to_cast: secondResult[l].min12,
              skill_level: secondResult[l].max12,
              skill: secondResult[l]["par12"],
            },
          });
        } else {
          Object.assign(itemObj, {
            [secondResult[l]["prop12"]]: {
              chance_to_cast: secondResult[l].min12,
              skill_level: secondResult[l].max12,
              skill: name.skill,
            },
          });
        }
      } else {
        Object.assign(itemObj, {
          [secondResult[l]["prop12"]]: {
            min: secondResult[l].min12,
            max: secondResult[l].max12,
          },
        });
      }
    }

    thirdResult.push(itemObj);
  }

  let fourthResult = [];
  for (let h = 0; h < thirdResult.length; h++) {
    const item = Object.entries(thirdResult[h]);
    const newItem = item.reduce((acc, [key, val]) => {
      const newKey = allProps.find((p) => p.code === key);
      if (newKey === undefined) {
        acc[key] = val;
      } else {
        acc[newKey.stat] = val;
      }
      return acc;
    }, {});
    fourthResult.push(newItem);
  }

  let fifthResult = [];
  for (let m = 0; m < fourthResult.length; m++) {
    const item = Object.entries(fourthResult[m]);
    const char_mods = item.reduce((acc, [key, val]) => {
      if (key.includes("char_")) {
        const newKey = key.substr(5);
        acc[newKey] = val;
      }
      return acc;
    }, {});
    const item_mods = item.reduce((acc, [key, val]) => {
      if (
        key.includes("item_") &&
        key !== "item_base" &&
        key !== "item_name" &&
        key !== "item_level"
      ) {
        const newKey = key.substr(5);
        acc[newKey] = val;
      }
      return acc;
    }, {});
    const theRest = item.reduce((acc, [key, val]) => {
      if (!key.includes("item_") && !key.includes("char_")) {
        acc[`${key}`] = val;
      } else if (
        key === "item_name" ||
        key === "item_base" ||
        key === "item_level"
      ) {
        acc[`${key}`] = val;
      }
      return acc;
    }, {});
    fifthResult.push({
      ...theRest,
      item_mods: {
        ...item_mods,
      },
      char_mods: {
        ...char_mods,
      },
    });
  }

  return fifthResult;
};
