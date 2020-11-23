export const convertUniques = (file) => {
  let result = [];
  const headers = file[0].data;

  // converts csv data into objects
  for (let i = 1; i < file.length; i++) {
    let obj = {};
    const currentline = file[i].data;

    for (let j = 0; j < headers.length; j++) {
      const val = currentline[j];
      if (val !== "" || val !== "Expansion") {
        obj[headers[j]] = currentline[j];
      }
    }

    result.push(obj);
  }
  let filterUseless = result.filter((item) => {
    if (
      item.index === "Expansion" ||
      item.index === "Armor" ||
      item.index === "Rings" ||
      item.index === "Class Specific" ||
      item.index === "Amulet of the Viper" ||
      item.index === "Staff of Kings" ||
      item.index === "Horadric Staff" ||
      item.index === "Hell Forge Hammer" ||
      item.index === "KhalimFlail" ||
      item.index === "SuperKhalimFlail"
    ) {
      return null;
    } else {
      return item;
    }
  });

  let filterEnabled = filterUseless.filter((item) => item.enabled === "1");
  return filterEnabled;
};
