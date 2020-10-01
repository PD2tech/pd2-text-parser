import q from "../json/all/base_oneswords.json";
import z from "../json/all/base_twoswords.json";

import armor from '../json/uni/swords.json'

const allBases = [
 ...q,
 ...z
];

const uni = armor;

export const combineAll = () => {
  let result = [];
  debugger;
  for (let i = 0; i < uni.length; i++) {
    let base = allBases.find((b) => {
      let found = b.item_name === uni[i].item_base;
      return found
    })
    base.item_name = uni[i].item_name;
    base.item_properties.level_requirement = uni[i].level_requirement;
    base.item_properties.rarity_type = 3;
    base.char_mods = uni[i].char_mods;
    base.item_mods = { ...base.item_mods, ...uni[i].item_mods };
    result.push(base)
  }
  return result

  // bows.map((i) => {
  //   let base = allBases.find(
  //     (b) => b.item_name.toLowerCase() === i.item_base.toLowerCase()
  //   );

  //   base.item_name = i.item_name;
  //   base.item_properties.level_requirement = i.level_requirement;
  //   base.item_properties.rarity_type = 3;
  //   base.char_mods = i.char_mods;
  //   base.item_mods = { ...base.item_mods, ...i.item_mods };
  //   return base;
  // });
};
