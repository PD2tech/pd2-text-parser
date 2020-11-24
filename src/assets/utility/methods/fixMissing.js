export const isMissingData = (val) => {
  if (
    val === "dmg-min" ||
    val === "dmg-max" ||
    val === "dmg%" ||
    val === "res-all" ||
    val === "res-all-max" ||
    val === "dmg-fire" ||
    val === "dmg-ltng" ||
    val === "dmg-mag" ||
    val === "dmg-cold" ||
    val === "dmg-pois" ||
    val === "dmg-norm" ||
    val === "dmg-elem"
  ) {
    return true;
  } else {
    return false;
  }
};

const handleNameAndString = (val, min, max, parVal) => {
  let resultObj = {
    name: "",
    string: "",
  };
  let newVal;
  if (min === undefined) {
    newVal = parVal;
  }

  if (val === "dmg-min") {
    resultObj.name = "damage_min";
    if (min === undefined) {
      resultObj.string = `+${newVal} to Minimum Damage`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max} to Minimum Damage`
          : `+${min} to Minimum Damage`;
    }
  } else if (val === "dmg-max") {
    resultObj.name = "damage_max";
    if (min === undefined) {
      resultObj.string = `+${newVal} to Maximum Damage`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max} to Maximum Damage`
          : `+${min} to Maximum Damage`;
    }
  } else if (val === "dmg%") {
    resultObj.name = "item_damage_percent";
    if (min === undefined) {
      resultObj.string = `+${newVal}% Enhanced Damage`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max}% Enhanced Damage`
          : `+${min}% Enhanced Damage`;
    }
  } else if (val === "res-all") {
    resultObj.name = "all_resist";
    if (min === undefined) {
      resultObj.string = `All Resistances +${newVal}`;
    } else {
      resultObj.string =
        min !== max
          ? `All Resistances +${min}-${max}`
          : `All Resistances +${min}`;
    }
  } else if (val === "res-all-max") {
    resultObj.name = "all_resist_max";
    if (min === undefined) {
      resultObj.string = `+${newVal} to All Maximum Resistances`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max} to All Maximum Resistances`
          : `+${min} to All Maximum Resistances`;
    }
  } else if (val === "dmg-fire") {
    resultObj.name = "fire_damage";
    if (min === undefined) {
      resultObj.string = `+${newVal} Fire Damage`;
    } else {
      resultObj.string =
        min !== max ? `+${min}-${max} Fire Damage` : `+${min} Fire Damage`;
    }
  } else if (val === "dmg-ltng") {
    resultObj.name = "lightning_damage";
    if (min === undefined) {
      resultObj.string = `+${newVal} Lightning Damage`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max} Lightning Damage`
          : `+${min} Lightning Damage`;
    }
  } else if (val === "dmg-cold") {
    resultObj.name = "cold_damage";
    if (min === undefined) {
      resultObj.string = `+${newVal} Cold Damage`;
    } else {
      resultObj.string =
        min !== max ? `+${min}-${max} Cold Damage` : `+${min} Cold Damage`;
    }
  } else if (val === "dmg-pois") {
    resultObj.name = "poison_damage";
    if (min === undefined) {
      resultObj.string = `+${newVal} Poison Damage`;
    } else {
      resultObj.string =
        min !== max ? `+${min}-${max} Poison Damage` : `+${min} Poison Damage`;
    }
  } else if (val === "dmg-mag") {
    resultObj.name = "magic_damage";
    if (min === undefined) {
      resultObj.string = `+${newVal} Magic Damage`;
    } else {
      resultObj.string =
        min !== max ? `+${min}-${max} Magic Damage` : `+${min} Magic Damage`;
    }
  } else if (val === "dmg-norm") {
    resultObj.name = "damage_flat";
    if (min === undefined) {
      resultObj.string = `+${newVal} Damage`;
    } else {
      resultObj.string =
        min !== max ? `+${min}-${max} Damage` : `+${min} Damage`;
    }
  } else if (val === "dmg-elem") {
    resultObj.name = "eledmg_flat";
    if (min === undefined) {
      resultObj.string = `+${newVal} Elemental Damage`;
    } else {
      resultObj.string =
        min !== max
          ? `+${min}-${max} Elemental Damage`
          : `+${min} Elemental Damage`;
    }
  }
  return resultObj;
};

export const fixStat = (val, item, propNum) => {
  const min = parseInt(item[`min${propNum}`]);
  const max = parseInt(item[`max${propNum}`]);
  let newVal;
  let resultObj = {
    key: "",
    string: "",
    min: 0,
    max: 0,
  };
  const nameAndString = handleNameAndString(
    val,
    min,
    max,
    item[`par${propNum}`]
  );
  if (min === undefined) {
    newVal = parseInt(item[`par${propNum}`]);
    resultObj.min = newVal;
    resultObj.max = newVal;
  } else {
    resultObj.min = min;
    resultObj.max = max;
  }
  resultObj.key = nameAndString.name;
  resultObj.string = nameAndString.string;
  return resultObj;
};

export const fixRwStat = (val, item, propNum) => {
  const min = parseInt(item[`T1Min${propNum}`]);
  const max = parseInt(item[`T1Max${propNum}`]);
  let newVal;
  let resultObj = {
    key: "",
    string: "",
    min: 0,
    max: 0,
  };
  const nameAndString = handleNameAndString(
    val,
    min,
    max,
    item[`par${propNum}`]
  );
  if (min === undefined) {
    newVal = parseInt(item[`T1Param${propNum}`]);
    resultObj.min = newVal;
    resultObj.max = newVal;
  } else {
    resultObj.min = min;
    resultObj.max = max;
  }
  resultObj.key = nameAndString.name;
  resultObj.string = nameAndString.string;
  return resultObj;
};

export const fixRuneStat = (val, min, max, type) => {
  let resultObj = {
    key: "",
    string: "",
    min: 0,
    max: 0,
  };
  let parVal = "";
  const nameAndString = handleNameAndString(val, min, max, parVal);

  resultObj.min = min;
  resultObj.max = max;
  resultObj.key = nameAndString.name;
  resultObj.string = `${type}: \n ${nameAndString.string}`;
  return resultObj;
};
