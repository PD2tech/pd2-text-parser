// import allBases from "../json/allBases.json";
import weapons from "../../../assets/results/weapon_bases.json";
import armor from "../../../assets/results/armor_bases.json";
import misc from "../../../assets/results/misc_bases.json";
import uni from "../results/uniques.json";

const allBases = [...weapons, ...armor, ...misc];

const fixNum = (n) => {
  return Math.round(n);
};

const calcDef = (base, item) => {
  let min = base.item_props.defense.min;
  let min2 = base.item_props.defense.min;
  let max = base.item_props.defense.max;
  let max2 = base.item_props.defense.max;
  if (item.item_mods.hasOwnProperty("item_armor_percent")) {
    min = min * (1 + item.item_mods["item_armor_percent"].min / 100);
    min2 = min2 * (1 + item.item_mods["item_armor_percent"].max / 100);
    max = max * (1 + item.item_mods["item_armor_percent"].min / 100);
    max2 = max2 * (1 + item.item_mods["item_armor_percent"].max / 100);
  }
  if (item.item_mods.hasOwnProperty("armorclass")) {
    min += item.item_mods["armorclass"].min;
    min2 += item.item_mods["armorclass"].max;
    max += item.item_mods["armorclass"].min;
    max2 += item.item_mods["armorclass"].max;
  }
  min = fixNum(min);
  min2 = fixNum(min2);
  max = fixNum(max);
  max2 = fixNum(max2);
  return min !== min2
    ? `(${min}-${min2}) to (${max}-${max2})`
    : `${min}-${max}`;
};

const calcDmg = (base, item) => {
  let isThrown = base.special_props.hasOwnProperty("thrown");
  let min = isThrown
    ? base.special_props.thrown.min
    : base.item_props.damage.min;
  let min2 = isThrown
    ? base.special_props.thrown.min
    : base.item_props.damage.min;
  let max = isThrown
    ? base.special_props.thrown.max
    : base.item_props.damage.max;
  let max2 = isThrown
    ? base.special_props.thrown.max
    : base.item_props.damage.max;
  if (item.item_mods.hasOwnProperty("ethereal")) {
    min = min * 1.5;
    min2 = min2 * 1.5;
    max = max * 1.5;
    max2 = max2 * 1.5;
  }
  if (item.item_mods.hasOwnProperty("item_damage_percent")) {
    min = min * (1 + item.item_mods["item_damage_percent"].min / 100);
    min2 = min2 * (1 + item.item_mods["item_damage_percent"].max / 100);
    max = max * (1 + item.item_mods["item_damage_percent"].min / 100);
    max2 = max2 * (1 + item.item_mods["item_damage_percent"].max / 100);
  }
  if (item.item_mods.hasOwnProperty("damage_min")) {
    min += item.item_mods["damage_min"].min;
    min2 += item.item_mods["damage_min"].max;
  }
  if (item.item_mods.hasOwnProperty("damage_max")) {
    max += item.item_mods["damage_max"].min;
    max2 += item.item_mods["damage_max"].max;
  }
  if (item.item_mods.hasOwnProperty("damage_flat")) {
    min += item.item_mods["damage_flat"].min;
    min2 += item.item_mods["damage_flat"].max;
    max += item.item_mods["damage_flat"].min;
    max2 += item.item_mods["damage_flat"].max;
  }
  min = fixNum(min);
  min2 = fixNum(min2);
  max = fixNum(max);
  max2 = fixNum(max2);
  return min !== min2
    ? `(${min}-${min2}) to (${max}-${max2})`
    : `${min}-${max}`;
};

const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// rings and amulets are still only using the last parsed ring or amulet's level req

export const combineAll = () => {
  let result = [];
  let unfound = [];
  uni.forEach((item) => {
    let base = Object.assign(
      {},
      allBases.find((b) => b.item_name === item.item_base)
    );
    if (base === undefined || base.item_props === undefined) {
      unfound.push(item);
    } else {
      // fix for weird names from txt files
      let name = item.item_name;
      if (name === "Gravenspine") {
        name = "Gravespine";
      } else if (name === "Warpspear") {
        name = "Warspear";
      } else if (name === "Whichwild String") {
        name = "Witchwild String";
      }
      base.item_props.item_base = base.item_name;
      base.item_name = item.item_name;
      base.item_props.level_req = item.level_requirement;
      base.item_props.rarity = 3;
      let allPropertyStrings = [...item.property_strings];

      const nameForS3 = name.toLowerCase().replace("'", "").replace(/\s/g, "");
      base.item_image = `https://pd2itemimages.s3.amazonaws.com/uniques/${nameForS3}.png`;
      if (base.item_type === "ring") {
        let int = randomInt(5);
        int += 1;
        base.item_image = `https://pd2itemimages.s3.amazonaws.com/rings/rin${int}.png`;
      } else if (base.item_type === "amulet") {
        let int = randomInt(3);
        int += 1;
        base.item_image = `https://pd2itemimages.s3.amazonaws.com/amulets/amu${int}.png`;
      }

      if (base.item_type === "armor") {
        base.item_props.calc_def = calcDef(base, item);
      }
      if (base.item_type === "weapon") {
        base.item_props.calc_dmg = calcDmg(base, item);
      }

      if (item.item_mods.hasOwnProperty("ethereal")) {
        base.item_props.quality.ethereal = true;
      }

      // have to do custom handleing for undead damage because some bases have the inherit 50%
      // from being blunt weapons, so it needs to be added with the mod on a unique and combined
      // for the value and string display
      let combineUndeadOnBlunt;
      if (
        base.item_mods &&
        item.item_mods &&
        base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        item.item_mods.hasOwnProperty("item_undeaddamage_percent")
      ) {
        const min =
          parseInt(base.item_mods.item_undeaddamage_percent.min) +
          parseInt(item.item_mods.item_undeaddamage_percent.min);
        const max =
          parseInt(base.item_mods.item_undeaddamage_percent.max) +
          parseInt(item.item_mods.item_undeaddamage_percent.max);
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
        item.item_mods &&
        base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        !item.item_mods.hasOwnProperty("item_undeaddamage_percent")
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
        item.item_mods &&
        !base.item_mods.hasOwnProperty("item_undeaddamage_percent") &&
        item.item_mods.hasOwnProperty("item_undeaddamage_percent")
      ) {
        const min = parseInt(item.item_mods.item_undeaddamage_percent.min);
        const max = parseInt(item.item_mods.item_undeaddamage_percent.max);
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
        ...item.item_mods,
        ...combineUndeadOnBlunt,
      };

      result.push({ ...base, property_strings: [...allPropertyStrings] });
    }
  });

  return { result: result, unfound: unfound };
};
