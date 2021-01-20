import armors from "../../results/armor_bases.json";
import weapons from "../../results/weapon_bases.json";

// dumb long way to do this because brain don't care right

export const armorTypes = () => {
  const helms = armors
    .map((obj) => {
      if (obj.type === "helm") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const circlets = armors
    .map((obj) => {
      if (obj.type === "circ") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const barbhelms = armors
    .map((obj) => {
      if (obj.type === "phlm") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const pelts = armors
    .map((obj) => {
      if (obj.type === "pelt") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const bodyarmors = armors
    .map((obj) => {
      if (obj.type === "tors") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const gloves = armors
    .map((obj) => {
      if (obj.type === "glov") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const boots = armors
    .map((obj) => {
      if (obj.type === "boot") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const belts = armors
    .map((obj) => {
      if (obj.type === "belt") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const shields = armors
    .map((obj) => {
      if (obj.type === "shie") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const pallyshields = armors
    .map((obj) => {
      if (obj.type === "ashd") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const heads = armors
    .map((obj) => {
      if (obj.type === "head") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  return [
    {
      type_name: "Helms",
      type_code: "helm",
      bases: helms,
    },
    {
      type_name: "Barb Helms",
      type_code: "phlm",
      bases: barbhelms,
    },
    {
      type_name: "Druid Pelts",
      type_code: "pelt",
      bases: pelts,
    },
    {
      type_name: "Circlets",
      type_code: "circ",
      bases: circlets,
    },
    {
      type_name: "Armors",
      type_code: "tors",
      bases: bodyarmors,
    },
    {
      type_name: "Gloves",
      type_code: "glov",
      bases: gloves,
    },
    {
      type_name: "Boots",
      type_code: "boot",
      bases: boots,
    },
    {
      type_name: "Belts",
      type_code: "belt",
      bases: belts,
    },
    {
      type_name: "Shields",
      type_code: "shie",
      bases: shields,
    },
    {
      type_name: "Pally Shields",
      type_code: "ashd",
      bases: pallyshields,
    },
    {
      type_name: "Necro Heads",
      type_code: "head",
      bases: heads,
    },
  ];
};

export const weaponTypes = () => {
  const oneaxes = weapons
    .map((obj) => {
      if (obj.type === "1haxe") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const twoaxes = weapons
    .map((obj) => {
      if (obj.type === "2haxe") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const oneswords = weapons
    .map((obj) => {
      if (obj.type === "1hswor") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const twoswords = weapons
    .map((obj) => {
      if (obj.type === "2hswor") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const maces = weapons
    .map((obj) => {
      if (obj.type === "mace") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const scepters = weapons
    .map((obj) => {
      if (obj.type === "scep") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const clubs = weapons
    .map((obj) => {
      if (obj.type === "club") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const hammers = weapons
    .map((obj) => {
      if (obj.type === "hamm") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const knives = weapons
    .map((obj) => {
      if (obj.type === "knif") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const tknives = weapons
    .map((obj) => {
      if (obj.type === "tkni") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const taxes = weapons
    .map((obj) => {
      if (obj.type === "taxe") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const javelins = weapons
    .map((obj) => {
      if (obj.type === "jave") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const spears = weapons
    .map((obj) => {
      if (obj.type === "spea") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const polearms = weapons
    .map((obj) => {
      if (obj.type === "pole") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const staves = weapons
    .map((obj) => {
      if (obj.type === "staf") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const bows = weapons
    .map((obj) => {
      if (obj.type === "bow") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const xbows = weapons
    .map((obj) => {
      if (obj.type === "xbow") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const h2h = weapons
    .map((obj) => {
      if (obj.type === "h2h" || obj.type === "h2h2") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const orbs = weapons
    .map((obj) => {
      if (obj.type === "orb") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const wands = weapons
    .map((obj) => {
      if (obj.type === "wand") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const abows = weapons
    .map((obj) => {
      if (obj.type === "abow") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const aspes = weapons
    .map((obj) => {
      if (obj.type === "aspe") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);
  const ajavs = weapons
    .map((obj) => {
      if (obj.type === "ajav") {
        return {
          item_code: obj.code,
          item_name: obj.name,
          item_base: obj.image.slice(obj.image.length - 7).replace(".png", ""),
        };
      }
    })
    .filter((obj) => obj);

  return [
    {
      type_name: "One-Handed Axes",
      type_code: "1haxe",
      bases: oneaxes,
    },
    {
      type_name: "Two-Handed Axes",
      type_code: "2haxe",
      bases: twoaxes,
    },
    {
      type_name: "One-Handed Swords",
      type_code: "1hswor",
      bases: oneswords,
    },
    {
      type_name: "Two-Handed Swords",
      type_code: "2hswor",
      bases: twoswords,
    },
    {
      type_name: "Maces",
      type_code: "mace",
      bases: maces,
    },
    {
      type_name: "Scepters",
      type_code: "scep",
      bases: scepters,
    },
    {
      type_name: "Clubs",
      type_code: "club",
      bases: clubs,
    },
    {
      type_name: "Hammers",
      type_code: "hamm",
      bases: hammers,
    },
    {
      type_name: "Daggers",
      type_code: "knif",
      bases: knives,
    },
    {
      type_name: "Throwing Knives",
      type_code: "tkni",
      bases: tknives,
    },
    {
      type_name: "Throwing Axes",
      type_code: "taxe",
      bases: taxes,
    },
    {
      type_name: "Javelins",
      type_code: "jave",
      bases: javelins,
    },
    {
      type_name: "Spears",
      type_code: "spea",
      bases: spears,
    },
    {
      type_name: "Polearms",
      type_code: "pole",
      bases: polearms,
    },
    {
      type_name: "Staves",
      type_code: "staf",
      bases: staves,
    },
    {
      type_name: "Bows",
      type_code: "bow",
      bases: bows,
    },
    {
      type_name: "Crossbows",
      type_code: "xbow",
      bases: xbows,
    },
    {
      type_name: "Wands",
      type_code: "wand",
      bases: wands,
    },
    {
      type_name: "Claws",
      type_code: "h2h",
      bases: h2h,
    },
    {
      type_name: "Orbs",
      type_code: "orb",
      bases: orbs,
    },
    {
      type_name: "Amazon Bows",
      type_code: "abow",
      bases: abows,
    },
    {
      type_name: "Amazon Spears",
      type_code: "aspe",
      bases: aspes,
    },
    {
      type_name: "Amazon Javelins",
      type_code: "ajav",
      bases: ajavs,
    },
  ];
};
