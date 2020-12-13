import allStrings from "../../../assets/utility/json/allStrings.json";

// bs that needs to be cleaned up

const getTypeProps = (type) => {
  if (type === "tors") {
    return {
      class_specific: null,
      type: "tors",
      s3: "armor",
      one: "tors",
      two: null,
    };
  } else if (type === "shie") {
    return {
      class_specific: null,
      type: "shie",
      s3: "shields",
      one: "larm",
      two: "rarm",
    };
  } else if (type === "glov") {
    return {
      class_specific: null,
      type: "glov",
      s3: "gloves",
      one: "glov",
      two: null,
    };
  } else if (type === "boot") {
    return {
      class_specific: null,
      type: "boot",
      s3: "boots",
      one: "feet",
      two: null,
    };
  } else if (type === "pelt") {
    return {
      class_specific: "Druid",
      type: "pelt",
      s3: "druid_helms",
      one: "head",
      two: null,
    };
  } else if (type === "phlm") {
    return {
      class_specific: "Barbarian",
      type: "phlm",
      s3: "barb_helms",
      one: "head",
      two: null,
    };
  } else if (type === "ashd") {
    return {
      class_specific: "Paladin",
      type: "ashd",
      s3: "pally_shields",
      one: "larm",
      two: "rarm",
    };
  } else if (type === "head") {
    return {
      class_specific: "Necromancer",
      type: "head",
      s3: "necro_heads",
      one: "larm",
      two: "rarm",
    };
  } else if (type === "circ") {
    return {
      class_specific: null,
      type: "circ",
      s3: "circlets",
      one: "head",
      two: null,
    };
  } else if (type === "helm") {
    return {
      class_specific: null,
      type: "helm",
      s3: "helms",
      one: "head",
      two: null,
    };
  } else if (type === "belt") {
    return {
      class_specific: null,
      type: "belt",
      s3: "belts",
      one: "belt",
      two: null,
    };
  }
};

export const generateArmor = (json) => {
  return json.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.code);
    const item_name = str_obj_name !== undefined ? str_obj_name.str : item.name;
    const item_code = item.code;
    const level_req = parseInt(item.levelreq);
    const durability = parseInt(item.durability);
    const max_sockets = parseInt(item.gemsockets);
    const inventory_height = parseInt(item.invheight);
    const inventory_width = parseInt(item.invwidth);
    const type_props = getTypeProps(item.type);
    const strength_requirement = parseInt(item.reqstr);
    const equip = {
      one: type_props.one,
      two: type_props.two,
    };

    let special_props = {};

    // normcode, ubercode, ultracode
    let item_tier = "norm";
    if (item.code === item.ubercode) {
      item_tier = "exc";
    } else if (item.code === item.ultracode) {
      item_tier = "elt";
    }

    let upgrade_code = null;
    let upgrade_name = "";
    if (item_tier === "norm") {
      upgrade_code = item.ubercode === "" ? null : item.ubercode;
      upgrade_name = upgrade_code ? allStrings.find((obj) => obj.id === item.ubercode).str : null;
    } else if (item_tier === "exc") {
      upgrade_code = item.ubercode === "" ? null : item.ultracode;
      upgrade_name = upgrade_code ? allStrings.find((obj) => obj.id === item.ultracode).str : null;
    }

    let block = null;

    if (type_props.type === "shie" || type_props.type === "ashd") {
      block = parseInt(item.block);
      special_props = {
        bonus: {
          str: 1,
          dex: 0,
        },
        smite: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
      };
    } else if (type_props.type === "boot") {
      special_props = {
        bonus: {
          str: 1.2,
          dex: 0,
        },
        kick: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
      };
    }

    return {
      name: item_name,
      group: "armor",
      type: type_props.type,
      code: item_code,
      image: `https://pd2itemimages.s3.amazonaws.com/${type_props.s3}/${item.normcode}.png`,
      props: {
        tier: item_tier,
        rarity: "nmag",
        class_only: type_props.class_specific,
        level_req,
        str_req: strength_requirement,
        dex_req: 0,
        durability,
        sockets: parseInt(max_sockets) > 0 ? parseInt(max_sockets) : null,
        upgrade: {
          code: upgrade_code,
          name: upgrade_name,
        },
      },
      defense: {
        min: parseInt(item.minac),
        max: parseInt(item.maxac),
        block,
      },
      damage:
        Object.keys(special_props).length > 0
          ? {
              ...special_props,
            }
          : null,
      quality: {
        inferior: false,
        superior: false,
        ethereal: false,
      },
      inventory: {
        height: parseInt(inventory_height),
        width: parseInt(inventory_width),
      },
      equip,
    };
  });
};
