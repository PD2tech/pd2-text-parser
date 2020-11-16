import React, { useState } from "react";

import { PropertiesParse } from "../../components/ParsingInputs/PropertiesParse";
import { ItemStatParse } from "../../components/ParsingInputs/ItemStatParse";
// import { SkillsParse } from "../../components/ParsingInputs/SkillsParse";
import { UniqueParse } from "../../components/ParsingInputs/UniqueParse";
import { StringParse } from "../../components/ParsingInputs/stringParse";
import { RunewordParse } from "../../components/ParsingInputs/RunewordParse";
import { parseUniqueItems } from "../../components/ParsingInputs/util/parseUniques";
import { parseRunewords } from "../../components/ParsingInputs/util/parseRunewords";

import { combineAll } from "../../components/ParsingInputs/util/combineAll";

export const App = () => {
  const [jsonFiles, setJsonFiles] = useState({
    properties: null,
    item_stat: null,
    skills: null,
    unique_items: null,
    rune_items: null,
    string: null,
    combined: null,
  });
  const [results, setResults] = useState(null);

  const showUniqueParser = () => {
    const { properties, item_stat } = jsonFiles;
    if (properties && item_stat) {
      return <UniqueParse setJsonFiles={setJsonFiles} />;
    }
  };

  const showRunewordParser = () => {
    const { properties, item_stat } = jsonFiles;
    if (properties && item_stat) {
      return <RunewordParse setJsonFiles={setJsonFiles} />;
    }
  };

  return (
    <div className="App">
      <div>
        <StringParse setJsonFiles={setJsonFiles} />
        <PropertiesParse setJsonFiles={setJsonFiles} />
        <ItemStatParse setJsonFiles={setJsonFiles} />
        {/* <SkillsParse setJsonFiles={setJsonFiles} /> */}
        {showUniqueParser()}
        {showRunewordParser()}
      </div>
      <div>
        {jsonFiles.unique_items ? (
          <div>
            <button
              onClick={() =>
                setResults(
                  parseUniqueItems(
                    jsonFiles.unique_items,
                    jsonFiles.item_stat,
                    jsonFiles.properties
                  )
                )
              }
            >
              Gen Uniques
            </button>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        ) : null}
        {jsonFiles.rune_items ? (
          <div>
            <button
              onClick={() =>
                setResults(
                  parseRunewords(
                    jsonFiles.rune_items,
                    jsonFiles.item_stat,
                    jsonFiles.properties
                  )
                )
              }
            >
              Gen Runewords
            </button>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        ) : null}
        {jsonFiles.string ? (
          <pre>{JSON.stringify(jsonFiles.string, null, 2)}</pre>
        ) : null}
        <button
          onClick={async () => {
            const combined = await combineAll();
            setJsonFiles((prevState) => ({ ...prevState, combined: combined }));
          }}
        >
          combine
        </button>
        {jsonFiles.combined ? (
          <pre>{JSON.stringify(jsonFiles.combined, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
};
