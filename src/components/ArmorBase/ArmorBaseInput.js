import React from "react";
import { convertArmor } from "./util/convertArmor";
import { generateArmor } from "./util/generateArmor";

import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export const ArmorBaseInput = (props) => {
  const { setJsonFiles } = props;
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = async (data) => {
    const newJson = await convertArmor(data);
    const result = generateArmor(newJson);
    setJsonFiles((prevState) => ({
      ...prevState,
      string: result,
    }));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  const handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={handleOnError}
      noClick
      noDrag
      onRemoveFile={handleOnRemoveFile}
    >
      {({ file }) => (
        <aside
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <button type="button" onClick={handleOpenDialog}>
            Armor.txt
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
              height: 25,
              paddingLeft: 12,
              width: "50%",
            }}
          >
            {file && file.name}
          </div>
          <button onClick={handleRemoveFile}>Remove</button>
        </aside>
      )}
    </CSVReader>
  );
};
