import uni from "../results/combinedUniques.json";

export const filterHands = () => {
  return uni.filter((item) => {
    if (
      item.item_properties.sub_type === "axe" ||
      item.item_properties.sub_type === "sword" ||
      item.item_properties.sub_type === "mace" ||
      item.item_properties.sub_type === "hammer" ||
      item.item_properties.sub_type === "scepter" ||
      item.item_properties.sub_type === "dagger" ||
      item.item_properties.sub_type === "polearm" ||
      item.item_properties.sub_type === "javelin" ||
      item.item_properties.sub_type === "throwing" ||
      item.item_properties.sub_type === "orb" ||
      item.item_properties.sub_type === "wand" ||
      item.item_properties.sub_type === "spear" ||
      item.item_properties.sub_type === "bow" ||
      item.item_properties.sub_type === "crossbow" ||
      item.item_properties.sub_type === "staff" ||
      item.item_properties.sub_type === "shield"
    ) {
      return item;
    }
  });
};

export const filterAllHelms = () => {
  return uni.filter((item) => {
    if (
      item.item_properties.sub_type === "helm" ||
      item.item_properties.sub_type === "circlet"
    ) {
      return item;
    }
  });
};

// export const filterAxe = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "axe");
// };

// export const filterSword = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "sword");
// };

// export const filterMace = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "mace");
// };

// export const filterHammer = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "hammer");
// };

// export const filterScepter = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "scepter");
// };

// export const filterDagger = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "dagger");
// };

// export const filterPolearm = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "polearm");
// };

// export const filterJavelin = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "javelin");
// };

// export const filterThrowing = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "throwing");
// };

// export const filterOrb = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "orb");
// };

// export const filterWand = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "wand");
// };

// export const filterSpear = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "spear");
// };

// export const filterBow = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "bow");
// };

// export const filterXbow = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "crossbow");
// };

// export const filterStaff = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "staff");
// };

// export const filterHelm = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "helm");
// };

// export const filterCirclet = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "circlet");
// };

export const filterArmor = () => {
  return uni.filter((item) => item.item_properties.sub_type === "body armor");
};

// export const filterShield = () => {
//   return uni.filter((item) => item.item_properties.sub_type === "shield");
// };

export const filterGloves = () => {
  return uni.filter((item) => item.item_properties.sub_type === "gloves");
};

export const filterBoots = () => {
  return uni.filter((item) => item.item_properties.sub_type === "boots");
};

export const filterBelts = () => {
  return uni.filter((item) => item.item_properties.sub_type === "belt");
};

export const filterRing = () => {
  return uni.filter((item) => item.item_type === "ring");
};

export const filterAmulet = () => {
  return uni.filter((item) => item.item_type === "amulet");
};

// export const filterJewel = () => {
//   return other.filter((item) => item.item_base === "Jewel");
// };

// export const filterCharm = () => {
//   return other.filter((item) => item.item_base.includes("Charm"));
// };
