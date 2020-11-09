export const descFuncUtil = (itemStatObj, allStrings, min, max, skill) => {
  let { Stat, descval, descfunc, descstrpos } = itemStatObj;
  let order = itemStatObj.descpriority;
  let stringObj = allStrings.find((str) => str.id === descstrpos);
  let str = "";
  if (stringObj !== undefined) {
    str = stringObj.str;
  }

  let propString = { order: order, string: str };
  // no descval
  if (descval === undefined) {
    if (descfunc === "14") {
      min !== max
        ? (propString.string = `+${min}-${max} to ${skill}`)
        : (propString.string = `+${min} to ${skill}`);
    } else if (descfunc === "27" || descfunc === "28") {
      min !== max
        ? (propString.string = `+${min}-${max} to ${skill}`)
        : (propString.string = `+${min} to ${skill}`);
    } else if (descfunc === "15") {
      let replace = propString.string.split(" ");
      for (let i = 0; i < replace.length; i++) {
        if (replace[i] === "%d%%") {
          replace[i] = `${min}%`;
        } else if (replace[i] === "%d") {
          replace[i] = max;
        } else if (replace[i] === "%s") {
          replace[i] = skill;
        }
      }
      propString.string = replace.join(" ");
    } else if (descfunc === "24") {
      propString.string = `Level ${max} ${skill} (${min} Charges)`;
    }
  } else if (descval === "0") {
    if (descfunc === "16") {
      let replace = propString.string.split(" ");
      for (let i = 0; i < replace.length; i++) {
        if (replace[i] === "%d") {
          replace[i] = min !== max ? `${min}-${max}` : `${min}`;
        } else if (replace[i] === "%s") {
          replace[i] = skill;
        }
      }
      propString.string = replace.join(" ");
    } else if (descfunc === "3") {
      if (Stat === "item_maxdamage_percent") {
        min !== max
          ? (propString.string = `${min}-${max}% ${propString.string}`)
          : (propString.string = `${min}% ${propString.string}`);
      }
      if (Stat === "item_mindamage_percent") {
        min !== max
          ? (propString.string = `${min}-${max}% ${propString.string}`)
          : (propString.string = `${min}% ${propString.string}`);
      }
    } else if (descfunc === "11") {
      propString.string = `Repairs durability over time`;
    }
  } else if (descval === "1") {
    if (descfunc === "1") {
      if (min < 0) {
        propString.string = `${min} ${propString.string}`;
      } else {
        min !== max
          ? (propString.string = `+${min}-${max} ${propString.string}`)
          : (propString.string = `+${min} ${propString.string}`);
      }
    } else if (descfunc === "2") {
      min !== max
        ? (propString.string = `${min}-${max}% ${propString.string}`)
        : (propString.string = `${min}% ${propString.string}`);
    } else if (descfunc === "3") {
      min !== max
        ? (propString.string = `${min}-${max} ${propString.string}`)
        : (propString.string = `${min} ${propString.string}`);
    } else if (descfunc === "4") {
      min !== max
        ? (propString.string = `+${min}-${max}% ${propString.string}`)
        : (propString.string = `+${min}% ${propString.string}`);
    } else if (descfunc === "6") {
      min !== max
        ? (propString.string = `+${min}-${Math.round(max * 100)} ${
            propString.string
          } (+${min}-${max} Based On Character level)`)
        : (propString.string = `+${min}-${Math.round(min * 100)} ${
            propString.string
          } (+${min} Based On Character level)`);
    } else if (descfunc === "7") {
      min !== max
        ? (propString.string = `${min}-${Math.round(max * 100)}% ${
            propString.string
          } (+${min}-${max} Based On Character level)`)
        : (propString.string = `${min}-${Math.round(min * 100)}% ${
            propString.string
          } (+${min} Based On Character level)`);
    } else if (descfunc === "8") {
      min !== max
        ? (propString.string = `+${min}-${Math.round(max * 100)}% ${
            propString.string
          } (+${min}-${max} Based On Character level)`)
        : (propString.string = `+${min}-${Math.round(min * 100)}% ${
            propString.string
          } (+${min} Based On Character level)`);
    } else if (descfunc === "20") {
      min !== max
        ? (propString.string = `-${min}-${max}% ${propString.string}`)
        : (propString.string = `-${min}% ${propString.string}`);
    } else if (descfunc === "22") {
      // may be unused
      min !== max
        ? (propString.string = `-${min}-${max}% ${propString.string}`)
        : (propString.string = `-${min}% ${propString.string}`);
    } else if (descfunc === "23") {
      propString.string = `${min}% ${propString.string} <insert monster name>`;
    }
  } else if (descval === "2") {
    if (descfunc === "1") {
      min !== max
        ? (propString.string = `${propString.string} +${min}-${max}`)
        : (propString.string = `${propString.string} +${min}`);
    } else if (descfunc === "2") {
      min !== max
        ? (propString.string = `${propString.string} ${min}-${max}%`)
        : (propString.string = `${propString.string} ${min}%`);
    } else if (descfunc === "3") {
      min !== max
        ? (propString.string = `${propString.string} ${min}-${max}`)
        : (propString.string = `${propString.string} ${min}`);
    } else if (descfunc === "4") {
      if (min > 0) {
        min !== max
          ? (propString.string = `${propString.string} +${min}-${max}%`)
          : (propString.string = `${propString.string} +${min}%`);
      } else {
        min !== max
          ? (propString.string = `${propString.string} ${min} to ${max}%`)
          : (propString.string = `${propString.string} ${min}%`);
      }
    } else if (descfunc === "5") {
      min !== max
        ? (propString.string = `${propString.string} ${min}-${max}%`)
        : (propString.string = `${propString.string} ${min}%`);
    } else if (descfunc === "12") {
      min !== max
        ? (propString.string = `${propString.string} +${min}-${max}`)
        : (propString.string = `${propString.string} +${min}`);
    } else if (descfunc === "7") {
      min !== max
        ? (propString.string = `${propString.string} ${min}-${Math.round(
            max * 100
          )}%
       (+${min}-${max} Based On Character level)`)
        : (propString.string = `${propString.string} ${min}-${Math.round(
            min * 100
          )}% (+${min} Based On Character level)`);
    } else if (descfunc === "9") {
      min !== max
        ? (propString.string = `${propString.string} ${min}-${Math.round(
            max * 100
          )}
       (+${min}-${max} Based On Character level)`)
        : (propString.string = `${propString.string} ${min}-${Math.round(
            min * 100
          )} (+${min} Based On Character level)`);
    }
  }
  return propString;
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
