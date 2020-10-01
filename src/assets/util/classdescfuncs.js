export const classDescfunc = (val, min, max) => {
  let classStr = "";
  if (val === "ama") {
    classStr = "Amazon";
  } else if (val === "ass") {
    classStr = "Assassin";
  } else if (val === "bar") {
    classStr = "Barbarian";
  } else if (val === "dru") {
    classStr = "Druid";
  } else if (val === "nec") {
    classStr = "Necromancer";
  } else if (val === "pal") {
    classStr = "Paladin";
  } else if (val === "sor") {
    classStr = "Sorceress";
  }
  return min !== max
    ? `+${min}-${max} to ${classStr} Skill Levels`
    : `+${min} to ${classStr} Skill Levels`;
};
