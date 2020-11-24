import allStrings from "../../ParsingInputs/json/allStrings.json";

const getTypeProps = (type, two_handed) => {
  if (type === "axe") {
    if (two_handed) {
      return {
        class_specific: null,
        type: "2haxe",
        s3: "two_axes",
      };
    } else {
      return {
        class_specific: null,
        type: "1haxe",
        s3: "one_axes",
      };
    }
  } else if (type === "swor") {
    if (two_handed) {
      return {
        class_specific: null,
        type: "2hsword",
        s3: "two_swords",
      };
    } else {
      return {
        class_specific: null,
        type: "1hsword",
        s3: "one_swords",
      };
    }
  } else if (type === "club") {
    return {
      class_specific: null,
      type: "club",
      s3: "maces",
    };
  } else if (type === "scep") {
    return {
      class_specific: null,
      type: "scepter",
      s3: "scepters",
    };
  } else if (type === "mace") {
    return {
      class_specific: null,
      type: "mace",
      s3: "maces",
    };
  } else if (type === "hamm") {
    return {
      class_specific: null,
      type: "hammer",
      s3: "hammers",
    };
  } else if (type === "knif") {
    return {
      class_specific: null,
      type: "dagger",
      s3: "daggers",
    };
  } else if (type === "spea" || type === "aspe") {
    return {
      class_specific: type === "aspe" ? "amazon" : null,
      type: "spear",
      s3: "spears",
    };
  } else if (type === "pole") {
    return {
      class_specific: null,
      type: "polearm",
      s3: "polearms",
    };
  } else if (type === "staf") {
    return {
      class_specific: null,
      type: "staff",
      s3: "staves",
    };
  } else if (type === "bow" || type === "abow") {
    return {
      class_specific: type === "abow" ? "amazon" : null,
      type: "bow",
      s3: "bows",
    };
  } else if (type === "xbow") {
    return {
      class_specific: null,
      type: "crossbow",
      s3: "crossbows",
    };
  } else if (type === "wand") {
    return {
      class_specific: null,
      type: "wand",
      s3: "wands",
    };
  } else if (type === "orb") {
    return {
      class_specific: null,
      type: "orb",
      s3: "sorc_orbs",
    };
  } else if (type === "h2h" || type === "h2h2") {
    return {
      class_specific: "assassin",
      type: "claw",
      s3: "claws",
    };
  } else if (type === "tkni" || type === "taxe") {
    return {
      class_specific: null,
      type: "throwing",
      s3: "throwing",
    };
  } else if (type === "jave" || type === "ajav") {
    return {
      class_specific: type === "ajav" ? "amazon" : null,
      type: "javelin",
      s3: "javelins",
    };
  }
};

export const generateWeapon = (json) => {
  return json.map((item) => {
    const str_obj_name = allStrings.find((str) => str.id === item.code);
    const item_name = str_obj_name !== undefined ? str_obj_name.str : item.name;
    const item_code = item.code;
    const level_req = parseInt(item.levelreq);
    const durability =
      item.nodurability === "1" ? null : parseInt(item.durability);
    const max_sockets = parseInt(item.gemsockets);
    const inventory_height = parseInt(item.invheight);
    const inventory_width = parseInt(item.invwidth);
    const strength_requirement = item.reqstr !== "" ? parseInt(item.reqstr) : 0;
    const dexterity_requirement =
      item.reqdex !== "" ? parseInt(item.reqstr) : 0;
    const range_adder = item.rangeadder !== "" ? parseInt(item.rangeadder) : 0;
    const weapon_speed = item.speed !== "" ? parseInt(item.speed) : 0;
    const two_handed = item[`2handed`] === "1" ? true : false;
    const one_two_handed = item[`1or2handed`] === "1" ? true : false;
    const can_be_thrown = item.minmisdam !== "" ? true : false;
    const type_props = getTypeProps(item.type, two_handed);
    let property_strings = [];

    let special_props = {};
    let item_mods = {};

    if (item[`auto prefix`] === "308") {
      item_mods = Object.assign(item_mods, {
        item_splashonhit: {
          min: 100,
          max: 1,
        },
      });
      property_strings.push({
        order: "160",
        string: "Melee Attacks Deal Splash Damage",
      });
    }

    if (
      type_props.type === "mace" ||
      type_props.type === "hammer" ||
      type_props.type === "scepter" ||
      type_props.type === "club" ||
      type_props.type === "wand" ||
      type_props.type === "staff"
    ) {
      item_mods = Object.assign(item_mods, {
        item_undeaddamage_percent: {
          min: 50,
          max: 50,
        },
      });
    }

    if (one_two_handed) {
      special_props = {
        one_hand_barb: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
      };
    } else if (item.minmisdam !== "") {
      special_props = {
        thrown: {
          min: parseInt(item.minmisdam),
          max: parseInt(item.maxmisdam),
        },
      };
    }

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

    return {
      item_name,
      item_type: "weapon",
      item_image: `https://pd2itemimages.s3.amazonaws.com/${type_props.s3}/${item.normcode}.png`,
      item_props: {
        item_base_code: item_code,
        upgrade,
        sub_type: type_props.type,
        class_specific: type_props.class_specific,
        damage: {
          min: two_handed
            ? parseInt(item[`2handmindam`])
            : parseInt(item.mindam),
          max: two_handed
            ? parseInt(item[`2handmaxdam`])
            : parseInt(item.maxdam),
        },
        damage_bonus: {
          str: item.StrBonus !== "" ? parseInt(item.StrBonus) : 0,
          dex: item.DexBonus !== "" ? parseInt(item.DexBonus) : 0,
        },
        weapon_speed,
        range_adder,
        two_handed,
        one_two_handed,
        can_be_thrown,
        durability,
        str_req: strength_requirement,
        dex_req: dexterity_requirement,
        level_req,
        item_tier: item_tier,
        rarity: 1,
        sockets: {
          socketable: parseInt(max_sockets) > 0 ? true : false,
          max: parseInt(max_sockets),
          used: 0,
        },
        quality: {
          low_quality: false,
          superior: false,
          ethereal: false,
        },
      },
      inventory_props: {
        height: parseInt(inventory_height),
        width: parseInt(inventory_width),
      },
      body_props: {
        equip1: 2,
        equip2: 4,
      },
      special_props,
      item_mods,
      property_strings,
    };
  });
};
