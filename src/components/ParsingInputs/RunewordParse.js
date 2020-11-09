import React from "react";
import { parseToJson } from "./util/parseToJson";

import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export const RunewordParse = (props) => {
  const { setJsonFiles } = props;
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    const newJson = parseToJson(data);
    setJsonFiles((prevState) => ({
      ...prevState,
      rune_items: newJson,
    }));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
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
            Runes.txt
          </button>
          <div
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
              height: 25,
              paddingLeft: 12,
              width: "20%",
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
