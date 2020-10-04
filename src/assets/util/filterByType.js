import uni from "../final_json/unique_items.json";
import other from "../final_json/charms_rings_jewels.json";

export const filterAxe = () => {
  return uni.filter((item) => item.item_properties.sub_type === "axe");
};

export const filterSword = () => {
  return uni.filter((item) => item.item_properties.sub_type === "sword");
};

export const filterMace = () => {
  return uni.filter((item) => item.item_properties.sub_type === "mace");
};

export const filterHammer = () => {
  return uni.filter((item) => item.item_properties.sub_type === "hammer");
};

export const filterScepter = () => {
  return uni.filter((item) => item.item_properties.sub_type === "scepter");
};

export const filterDagger = () => {
  return uni.filter((item) => item.item_properties.sub_type === "dagger");
};

export const filterPolearm = () => {
  return uni.filter((item) => item.item_properties.sub_type === "polearm");
};

export const filterJavelin = () => {
  return uni.filter((item) => item.item_properties.sub_type === "javelin");
};

export const filterThrowing = () => {
  return uni.filter((item) => item.item_properties.sub_type === "throwing");
};

export const filterOrb = () => {
  return uni.filter((item) => item.item_properties.sub_type === "orb");
};

export const filterWand = () => {
  return uni.filter((item) => item.item_properties.sub_type === "wand");
};

export const filterSpear = () => {
  return uni.filter((item) => item.item_properties.sub_type === "spear");
};

export const filterBow = () => {
  return uni.filter((item) => item.item_properties.sub_type === "bow");
};

export const filterXbow = () => {
  return uni.filter((item) => item.item_properties.sub_type === "crossbow");
};

export const filterHelm = () => {
  return uni.filter((item) => item.item_properties.sub_type === "helm");
};

export const filterShield = () => {
  return uni.filter((item) => item.item_properties.sub_type === "shield");
};

export const filterGloves = () => {
  return uni.filter((item) => item.item_properties.sub_type === "gloves");
};

export const filterBoots = () => {
  return uni.filter((item) => item.item_properties.sub_type === "boots");
};

export const filterBelt = () => {
  return uni.filter((item) => item.item_properties.sub_type === "belt");
};

export const filterArmor = () => {
  return uni.filter((item) => !item.item_properties.sub_type);
};

export const filterRing = () => {
  return other.filter((item) => item.item_base === "Ring");
};

export const filterAmulet = () => {
  return other.filter((item) => item.item_base === "Amulet");
};

export const filterJewel = () => {
  return other.filter((item) => item.item_base === "Jewel");
};

export const filterCharm = () => {
  return other.filter((item) => item.item_base.includes("Charm"));
};
