export const parseArmor = () => {
  const armorsP = armors.map((a) => {
    return {
      item_name: a.itemName,
      item_type: "armor",
      item_image: a.itemImage,
      item_properties: {
        item_base: a.itemName,
        sub_type: "circlet",
        class_specific: null,
        durability: a.durability,
        strength_requirement: a.strReq,
        dexterity_requirement: 0,
        level_requirement: a.cLvlReq,
        item_tier: null,
        rarity_type: 1,
        quality_modifier: {
          low_quality: false,
          superior: false,
          ethereal: false,
        },
      },
      item_mods: {},
      char_mods: {},
    };
  });
  return armorsP;
};
