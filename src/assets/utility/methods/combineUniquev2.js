import uniques from "../reference/uniques.json";
import weapons from "../../../assets/results/weapon_bases.json";
import armor from "../../../assets/results/armor_bases.json";
import misc from "../../../assets/results/misc_bases.json";
import clone from "lodash.clonedeep";

const allBases = [...weapons, ...armor, ...misc];

// const fixNum = (n) => {
//   return Math.round(n);
// };
const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const combineUnique = () => {
  return uniques.map((uni) => {
    const findBase = Object.assign(
      {},
      allBases.find((base) => base.code === uni.base_code)
    );
    let base = clone(findBase);

    let name = uni.name;
    if (name === "Warpspear") {
      name = "Warspear";
    } else if (name === "Whichwild String") {
      name = "Witchwild String";
    }

    const nameForS3 = name.toLowerCase().replace("'", "").replace(/\s/g, "");
    let image = `https://pd2itemimages.s3.amazonaws.com/uniques/${nameForS3}.png`;
    if (base.type === "ring") {
      let int = randomInt(5);
      int += 1;
      image = `https://pd2itemimages.s3.amazonaws.com/rings/rin${int}.png`;
    } else if (base.type === "amul") {
      let int = randomInt(3);
      int += 1;
      image = `https://pd2itemimages.s3.amazonaws.com/amulets/amu${int}.png`;
    } else if (base.type === "jewl") {
      let int = randomInt(6);
      int += 1;
      image = `https://pd2itemimages.s3.amazonaws.com/jewels/jew${int}.png`;
    } else if (base.code === "cm3") {
      image = "https://pd2itemimages.s3.amazonaws.com/charms/cm31.png";
    } else if (base.code === "cm2") {
      image = "https://pd2itemimages.s3.amazonaws.com/utility/trch.png";
    } else if (base.code === "cm1") {
      image = "https://pd2itemimages.s3.amazonaws.com/utility/mss.png";
    }

    let fixStatsForUndead = [];
    const baseHasUndead =
      base.stats !== undefined ? base.stats.filter((obj) => obj.code === "dmg-undead") : [];
    const uniHasUndead = uni.mods.filter((obj) => obj.code === "dmg-undead");
    if (baseHasUndead.length > 0 && uniHasUndead.length > 0) {
      const min = uniHasUndead[0].min;
      const max = uniHasUndead[0].max;
      fixStatsForUndead.push({
        code: "dmg-undead",
        name: "item_undeaddamage_percent",
        display:
          min !== max
            ? `+${min + 50}-${max + 50}% Damage to Undead`
            : `+${min + 50}% Damage to Undead`,
        min: min,
        max: max,
        order: 108,
        sub_stats: [],
      });
    } else if (baseHasUndead.length === 0 && uniHasUndead.length > 0) {
      fixStatsForUndead.push(uniHasUndead[0]);
    } else if (baseHasUndead.length > 0 && uniHasUndead.length === 0) {
      fixStatsForUndead.push(baseHasUndead[0]);
    }
    const removeUndeadFromUni = uni.mods.filter((obj) => obj.code !== "dmg-undead");
    const orderStats = [...fixStatsForUndead, ...removeUndeadFromUni].sort(
      (a, b) => b.order - a.order
    );

    return {
      ...base,
      name: name,
      group: base.group,
      type: base.type,
      code: base.code,
      base_name: base.name,
      image: image,
      props: {
        ...base.props,
        rarity: "uni",
        level_req: uni.level_requirement,
      },
      stats: orderStats,
    };
  });
};
