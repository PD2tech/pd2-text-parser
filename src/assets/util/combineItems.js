import allBases from "../json/allBases.json";
import uni from "../json/uniquesBeforeSecond.json";

export const combineAll = () => {
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
            min: min.toString(),
            max: max.toString(),
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
