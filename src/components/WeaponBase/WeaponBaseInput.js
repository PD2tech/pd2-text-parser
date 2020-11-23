import React from "react";
import { convertWeapon } from "./util/convertWeapon";
import { generateWeapon } from "./util/generateWeapon";

import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export const WeaponBaseInput = (props) => {
  const { setJsonFiles } = props;
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = async (data) => {
    const newJson = await convertWeapon(data);
    const result = generateWeapon(newJson);
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
            Weapons.txt
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
