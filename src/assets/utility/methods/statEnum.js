import itemStat from "../../reference/itemstat.json";
// import { classSkillUtil } from "./classSkillUtil";
// import { descFuncUtil } from "./descFuncs";
// import { isMissingData, fixStat } from "./fixMissing";
// import treeIds from "../json/skilltab.json";
// import skillIds from "../json/skillIds.json";
//
import { descval0 } from "../descfuncs/descval0";
import { descval1 } from "../descfuncs/descval1";
import { descval2 } from "../descfuncs/descval2";

export const statEnum = () => {
  const enums = itemStat.map((obj) => {
    let string = "";
    if (obj.descval && obj.descval === "0") {
      string = descval0(obj);
    } else if (obj.descval && obj.descval === "1") {
      string = descval1(obj);
    } else if (obj.descval && obj.descval === "2") {
      string = descval2(obj);
    }
    const id = obj.Stat;
    return {
      id: id,
      string: string,
    };
  });
  const hasString = enums.filter((obj) => obj.string !== "");
  const noString = enums.filter((obj) => obj.string === "");
  return {
    hasString: hasString,
    noString: noString,
  };
};
