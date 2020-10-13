import allBases from "../json/allBases.json";
import { parseItems } from "./parseItems";
import uni from "../json/uniquesBeforeBase.json";

export const combineAll = () => {
  // const uni = parseItems();

  let result = [];
  let unfound = [];
  for (let i = 0; i < uni.length; i++) {
    let base = allBases.find((b) => b.item_name === uni[i].item_base);
    if (base === undefined) {
      unfound.push(uni[i]);
    } else {
      base.item_name = uni[i].item_name;
      base.item_properties.level_requirement = uni[i].level_requirement;
      base.item_properties.rarity_type = 3;
      let allPropertyStrings = [...uni[i].property_strings];

      // have to do custom handleing for undead damage because some bases have the inherit 50%
      // from being blunt weapons, so it needs to be added with the mod on a unique and combined
      // for the value and string display
      let combineUndeadOnBlunt;
      if (
        base.item_mods &&
        uni[i].item_mods &&
        base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        uni[i].item_mods.hasOwnProperty("item_undeaddamage_percent")
      ) {
        const min =
          parseInt(base.item_mods.item_undeaddamage_percent.min) +
          parseInt(uni[i].item_mods.item_undeaddamage_percent.min);
        const max =
          parseInt(base.item_mods.item_undeaddamage_percent.max) +
          parseInt(uni[i].item_mods.item_undeaddamage_percent.max);
        combineUndeadOnBlunt = {
          item_undeaddamage_percent: {
            min: min,
            max: max,
          },
        };
        const string =
          min !== max
            ? `+${min}-${max}% Damage To Undead`
            : `+${min}% Damage To Undead`;
        allPropertyStrings.push({ order: "108", string: string });
      } else if (
        base.item_mods &&
        uni[i].item_mods &&
        base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        !uni[i].item_mods.hasOwnProperty("item_undeaddamage_percent")
      ) {
        const min = parseInt(base.item_mods.item_undeaddamage_percent.min);
        const max = parseInt(base.item_mods.item_undeaddamage_percent.max);
        combineUndeadOnBlunt = {
          item_undeaddamage_percent: {
            min: min,
            max: max,
          },
        };
        const string =
          min !== max
            ? `+${min}-${max}% Damage To Undead`
            : `+${min}% Damage To Undead`;
        allPropertyStrings.push({ order: "108", string: string });
      } else if (
        base.item_mods &&
        uni[i].item_mods &&
        !base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        uni[i].item_mods.hasOwnProperty("item_undeaddamage_percent")
      ) {
        const min = parseInt(uni[i].item_mods.item_undeaddamage_percent.min);
        const max = parseInt(uni[i].item_mods.item_undeaddamage_percent.max);
        combineUndeadOnBlunt = {
          item_undeaddamage_percent: {
            min: min,
            max: max,
          },
        };
        const string =
          min !== max
            ? `+${min}-${max}% Damage To Undead`
            : `+${min}% Damage To Undead`;
        allPropertyStrings.push({ order: "108", string: string });
      }

      allPropertyStrings.sort((a, b) => b.order - a.order);

      base.item_mods = {
        ...base.item_mods,
        ...uni[i].item_mods,
        ...combineUndeadOnBlunt,
      };
      result.push({ ...base, property_strings: [...allPropertyStrings] });
    }
  }
  return { result: result, unfound: unfound };
};
