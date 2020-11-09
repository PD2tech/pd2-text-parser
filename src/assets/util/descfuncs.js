export const descfunc0 = (descfunc, min, max, str, skill, val) => {
  if (descfunc === "3") {
    return;
  }
  if (descfunc === "16") {
    return min !== max
      ? str.replace(/%d/, `${min}-${max}`).replace(/%s/, skill)
      : str.replace(/%d/, `${max}`).replace(/%s/, skill);
  }
};

export const descfuncStr1 = (descfunc, min, max, str, val) => {
  if (descfunc === "1") {
    return min !== max ? `+${min}-${max} ${str}` : `+${min} ${str}`;
  } else if (descfunc === "2") {
    return min !== max ? `${min}-${max}% ${str}` : `${min}% ${str}`;
  } else if (descfunc === "3") {
    return min !== max ? `${min}-${max} ${str}` : `${min} ${str}`;
  } else if (descfunc === "4") {
    return min !== max ? `+${min}-${max}% ${str}` : `+${min}% ${str}`;
  } else if (descfunc === "6") {
    return `+${val}-${Math.round(val * 99)} ${str} (Based On Character level)`;
  } else if (descfunc === "7") {
    return `${val}-${Math.round(val * 99)}% ${str} (Based On Character level)`;
  } else if (descfunc === "8") {
    return `+${val}-${Math.round(val * 99)}% ${str} (Based On Character level)`;
  } else if (descfunc === "20") {
    return min !== max ? `-${min}-${max}% ${str}` : `-${min}% ${str}`;
  }
};

export const descfuncStr2 = (descfunc, min, max, str, val) => {
  if (descfunc === "1") {
    return min !== max ? `${str} +${min}-${max}` : `${str} +${min}`;
  } else if (descfunc === "2") {
    return min !== max ? `${str} ${min}-${max}%` : `${str} ${min}%`;
  } else if (descfunc === "3") {
    return min !== max ? `${str} ${min}-${max}` : `${str} ${min}`;
  } else if (descfunc === "4") {
    return min !== max ? `${str} +${min}-${max}%` : `${str} +${min}%`;
  } else if (descfunc === "5") {
    return min !== max ? `${str} ${min}-${max}%` : `${str} ${min}%`;
  } else if (descfunc === "12") {
    return min !== max ? `${str} +${min}-${max}` : `${str} +${min}`;
  } else if (descfunc === "7") {
    return `${str} ${val}-${Math.round(val * 99)}% (Based On Character level)`;
  } else if (descfunc === "9") {
    return `${str} ${val}-${Math.round(val * 99)} (Based On Character level)`;
  }
};

export const descfuncCustom = (newPropName, min, max) => {
  if (newPropName === "item_damage_percent") {
    return min !== max
      ? `+${min}-${max}% Enhanced Damage`
      : `+${min}% Enhanced Damage`;
  } else if (newPropName === "all_attributes") {
    return min !== max
      ? `+${min}-${max} To All Attributes`
      : `+${min} To All Attributes`;
  } else if (newPropName === "all_resist") {
    return min !== max
      ? `All Resistances +${min}-${max}`
      : `All Resistances +${min}`;
  } else if (newPropName === "all_resist_max") {
    return `+${min} To Maximum Poison Resist\n+${min} To Maximum Cold Resist\n
    +${min} To Maximum Lightning Resist\n
    +${min} To Maximum Fire Resist`;
  } else if (newPropName === "firedmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Fire Damage`
      : `Adds ${min} Fire Damage`;
  } else if (newPropName === "lightdmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Lightning Damage`
      : `Adds ${min} Lightning Damage`;
  } else if (newPropName === "colddmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Cold Damage`
      : `Adds ${min} Cold Damage`;
  } else if (newPropName === "poisondmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Poison Damage`
      : `Adds ${min} Poison Damage`;
  } else if (newPropName === "damage_flat") {
    return min !== max ? `Adds ${min}-${max} Damage` : `Adds ${min} Damage`;
  } else if (newPropName === "damage_min") {
    return min !== max
      ? `Adds ${min}-${max} Minimum Damage`
      : `Adds ${min} Minimum Damage`;
  } else if (newPropName === "damage_max") {
    return min !== max
      ? `Adds ${min}-${max} Maximum Damage`
      : `Adds ${min} Maximum Damage`;
  } else if (newPropName === "magicdmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Magic Damage`
      : `Adds ${min} Magic Damage`;
  } else if (newPropName === "eledmg_flat") {
    return min !== max
      ? `Adds ${min}-${max} Fire Damage\n
        Adds ${min}-${max} Lightning Damage\n
        Adds ${min}-${max} Cold Damage`
      : `Adds ${min} Fire Damage\n
        Adds ${min} Lightning Damage\n
        Adds ${min} Cold Damage`;
  } else {
    console.log(newPropName);
  }
};

// descfunc

// 1 - +[value] [string1]
// 2 - [value]% [string1]
// 3 - [value] [string1]
// 4 - +[value]% [string1]
// 5 - [value*100/128]% [string1]
// 6 - +[value] [string1] [string2]
// 7 - [value]% [string1] [string2]
// 8 - +[value]% [string1] [string2]
// 9 - [value] [string1] [string2]
// 10 - [value*100/128]% [string1] [string2]
// 11 - Repairs 1 Durability In [100 / value] Seconds
// 12 - +[value] [string1]
// 13 - +[value] to [class] Skill Levels

// descval
// 0 = no stat
// 1 = stat before description
// 2 = stat after

// perlevel stuff
