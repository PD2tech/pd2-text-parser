export const classSkillUtil = (val, min, max) => {
  let minVal = parseInt(min);
  let maxVal = parseInt(max);
  let resultObj = {
    key: "",
    string: "",
    min: minVal,
    max: maxVal,
  };
  let classString = "";
  if (val === "ama") {
    resultObj["key"] = "amazon_skills";
    classString = "Amazon";
  } else if (val === "ass") {
    resultObj["key"] = "assassin_skills";
    classString = "Assassin";
  } else if (val === "bar") {
    resultObj["key"] = "barbarian_skills";
    classString = "Barbarian";
  } else if (val === "dru") {
    resultObj["key"] = "druid_skills";
    classString = "Druid";
  } else if (val === "nec") {
    resultObj["key"] = "necromancer_skills";
    classString = "Necromancer";
  } else if (val === "pal") {
    resultObj["key"] = "paladin_skills";
    classString = "Paladin";
  } else if (val === "sor") {
    resultObj["key"] = "sorceress_skills";
    classString = "Sorceress";
  }
  resultObj["string"] =
    minVal !== maxVal
      ? `+${minVal}-${maxVal} to ${classString} Skill Levels`
      : `+${minVal} to ${classString} Skill Levels`;
  return resultObj;
};
