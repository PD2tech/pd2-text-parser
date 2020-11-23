export const convertProperties = (file) => {
  let result = [];
  const headers = file[0].data;

  // converts csv data into objects
  for (let i = 1; i < file.length; i++) {
    let obj = {};
    const currentline = file[i].data;

    for (let j = 0; j < headers.length; j++) {
      const val = currentline[j];
      if (val !== "") {
        obj[headers[j]] = currentline[j];
      }
    }

    result.push(obj);
  }
  return result;
};
