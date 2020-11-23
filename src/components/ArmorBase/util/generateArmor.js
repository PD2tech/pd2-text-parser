import allStrings from "../../ParsingInputs/json/allStrings.json";

const getTypeProps = (type) => {
  if (type === "tors") {
    return {
      class_specific: null,
      type: "body armor",
      s3: "armor",
      equip1: 3,
      equip2: null,
    };
  } else if (type === "shie") {
    return {
      class_specific: null,
      type: "shield",
      s3: "shields",
      equip1: 2,
      equip2: 4,
    };
  } else if (type === "glov") {
    return {
      class_specific: null,
      type: "gloves",
      s3: "gloves",
      equip1: 5,
      equip2: null,
    };
  } else if (type === "boot") {
    return {
      class_specific: null,
      type: "boots",
      s3: "boots",
      equip1: 9,
      equip2: null,
    };
  } else if (type === "pelt") {
    return {
      class_specific: "druid",
      type: "pelt",
      s3: "druid_helms",
      equip1: 0,
      equip2: null,
    };
  } else if (type === "phlm") {
    return {
      class_specific: "barbarian",
      type: "barb",
      s3: "barb_helms",
      equip1: 0,
      equip2: null,
    };
  } else if (type === "ashd") {
    return {
      class_specific: "paladin",
      type: "pally",
      s3: "pally_shields",
      equip1: 2,
      equip2: 4,
    };
  } else if (type === "head") {
    return {
      class_specific: "necromancer",
      type: "necro",
      s3: "necro_heads",
      equip1: 2,
      equip2: 4,
    };
  } else if (type === "circ") {
    return {
      class_specific: null,
      type: "circlet",
      s3: "circlets",
      equip1: 0,
      equip2: null,
    };
  } else if (type === "helm") {
    return {
      class_specific: null,
      type: "helm",
      s3: "helms",
      equip1: 0,
      equip2: null,
    };
  } else if (type === "belt") {
    return {
      class_specific: null,
      type: "belt",
      s3: "belts",
      equip1: 7,
      equip2: null,
    };
  }
};

export const generateArmor = (json) => {
  return json.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.code);
    const item_name = str_obj_name !== undefined ? str_obj_name.str : item.name;
    const item_code = item.code;
    const level_requirment = parseInt(item.levelreq);
    const durability = parseInt(item.durability);
    const max_sockets = parseInt(item.gemsockets);
    const inventory_height = parseInt(item.invheight);
    const inventory_width = parseInt(item.invwidth);
    const type_props = getTypeProps(item.type);
    const strength_requirement = parseInt(item.reqstr);
    const body_props = {
      equip1: type_props.equip1,
      equip2: type_props.equip2,
    };

    let special_props = {};

    // normcode, ubercode, ultracode
    let item_tier = 1;
    if (item.code === item.ubercode) {
      item_tier = 2;
    } else if (item.code === item.ultracode) {
      item_tier = 3;
    }

    let upgrade = null;
    if (item_tier === 1) {
      upgrade = item.ubercode;
    } else if (item_tier === 2) {
      upgrade = item.ultracode;
    }

    if (type_props.type === "shield" || type_props.type === "pally") {
      special_props = {
        smite: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
        damage_bonus: {
          strength_bonus: 1,
          dexterity_bonus: 0,
        },
        block: parseInt(item.block),
      };
    } else if (type_props.type === "boots") {
      special_props = {
        kick: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
        damage_bonus: {
          strength_bonus: 1.2,
          dexterity_bonus: 0,
        },
      };
    }

    return {
      item_name,
      item_type: "armor",
      item_image: `https://pd2itemimages.s3.amazonaws.com/${type_props.s3}/${item_code}.png`,
      item_properties: {
        item_base: item_code,
        upgrade,
        sub_type: type_props.type,
        class_specific: type_props.class_specific,
        durability,
        strength_req: strength_requirement,
        dexterity_req: 0,
        level_requirment,
        item_tier: item_tier,
        rarity: 1,
        sockets: {
          socketable: parseInt(max_sockets) > 0 ? true : false,
          max: parseInt(max_sockets),
          used: 0,
        },
        quality_modifier: {
          low_quality: false,
          superior: false,
          ethereal: false,
        },
      },
      inventory_props: {
        height: parseInt(inventory_height),
        width: parseInt(inventory_width),
      },
      body_props,
      special_props,
      item_mods: {},
    };
  });
};
