import allStrings from "../../../assets/utility/json/allStrings.json";

// more bs that needs to be cleaned up

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
        type: "2hswor",
        s3: "two_swords",
      };
    } else {
      return {
        class_specific: null,
        type: "1hswor",
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
      type: "scep",
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
      type: "hamm",
      s3: "hammers",
    };
  } else if (type === "knif") {
    return {
      class_specific: null,
      type: "knif",
      s3: "daggers",
    };
  } else if (type === "spea" || type === "aspe") {
    return {
      class_specific: type === "aspe" ? "Amazon" : null,
      type: type === "aspe" ? "aspe" : "spea",
      s3: "spears",
    };
  } else if (type === "pole") {
    return {
      class_specific: null,
      type: "pole",
      s3: "polearms",
    };
  } else if (type === "staf") {
    return {
      class_specific: null,
      type: "staf",
      s3: "staves",
    };
  } else if (type === "bow" || type === "abow") {
    return {
      class_specific: type === "abow" ? "Amazon" : null,
      type: type === "abow" ? "abow" : "bow",
      s3: "bows",
    };
  } else if (type === "xbow") {
    return {
      class_specific: null,
      type: "xbow",
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
      class_specific: "Sorceress",
      type: "orb",
      s3: "sorc_orbs",
    };
  } else if (type === "h2h" || type === "h2h2") {
    return {
      class_specific: "Assassin",
      type: type === "h2h" ? "h2h" : "h2h2",
      s3: "claws",
    };
  } else if (type === "tkni" || type === "taxe") {
    return {
      class_specific: null,
      type: type === "tkni" ? "tkni" : "taxe",
      s3: "throwing",
    };
  } else if (type === "jave" || type === "ajav") {
    return {
      class_specific: type === "ajav" ? "Amazon" : null,
      type: type === "jave" ? "jave" : "ajav",
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
    const durability = item.nodurability === "1" ? null : parseInt(item.durability);
    const max_sockets = parseInt(item.gemsockets);
    const inventory_height = parseInt(item.invheight);
    const inventory_width = parseInt(item.invwidth);
    const strength_requirement = item.reqstr !== "" ? parseInt(item.reqstr) : 0;
    const dexterity_requirement = item.reqdex !== "" ? parseInt(item.reqstr) : 0;
    const range = item.rangeadder !== "" ? parseInt(item.rangeadder) : 0;
    const speed = item.speed !== "" ? parseInt(item.speed) : 0;
    const two_handed = item[`2handed`] === "1" ? true : false;
    const one_two_handed = item[`1or2handed`] === "1" ? true : false;
    const throwable = item.minmisdam !== "" ? true : false;
    const type_props = getTypeProps(item.type, two_handed);

    let special_props = {};
    let stats = [];

    if (item[`auto prefix`] === "308") {
      stats.push({
        code: "splash",
        min: 100,
        max: 1,
        order: 160,
        string: "Melee Attacks Deal Splash Damage",
      });
    }

    if (
      type_props.type === "mace" ||
      type_props.type === "hamm" ||
      type_props.type === "scep" ||
      type_props.type === "club" ||
      type_props.type === "wand" ||
      type_props.type === "staf"
    ) {
      stats.push({
        code: "dmg-undead",
        min: 50,
        max: 50,
        order: 108,
        string: "+50% Damage To Undead",
      });
    }

    if (one_two_handed) {
      special_props = {
        barb1h: {
          min: parseInt(item.mindam),
          max: parseInt(item.maxdam),
        },
      };
    } else if (item.minmisdam !== "") {
      special_props = {
        throw: {
          min: parseInt(item.minmisdam),
          max: parseInt(item.maxmisdam),
        },
      };
    }

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

    return {
      name: item_name,
      group: "weapon",
      type: type_props.type,
      code: item_code,
      image: `https://pd2itemimages.s3.amazonaws.com/${type_props.s3}/${item.normcode}.png`,
      props: {
        tier: item_tier,
        rarity: "nmag",
        class_only: type_props.class_specific,
        level_req,
        str_req: strength_requirement,
        dex_req: dexterity_requirement,
        speed,
        range,
        durability,
        sockets: parseInt(max_sockets) > 0 ? parseInt(max_sockets) : null,
        upgrade: {
          code: upgrade_code,
          name: upgrade_name,
        },
      },
      damage: {
        is2h: two_handed,
        has_barb_1h: one_two_handed,
        throwable,
        bonus: {
          str: item.StrBonus !== "" ? parseInt(item.StrBonus) : 0,
          dex: item.DexBonus !== "" ? parseInt(item.DexBonus) : 0,
        },
        main: {
          min: two_handed ? parseInt(item[`2handmindam`]) : parseInt(item.mindam),
          max: two_handed ? parseInt(item[`2handmaxdam`]) : parseInt(item.maxdam),
        },
        ...special_props,
      },
      quality: {
        inferior: false,
        superior: false,
        ethereal: false,
      },
      inventory: {
        height: parseInt(inventory_height),
        width: parseInt(inventory_width),
      },
      equip: {
        one: "larm",
        two: "rarm",
      },
      stats,
    };
  });
};
