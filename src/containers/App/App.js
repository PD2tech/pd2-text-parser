import React, { useState } from "react";

import {
  PropertiesInput,
  ItemStatInput,
  UniqueInput,
  RunewordInput,
  StringInput,
  ArmorBaseInput,
  WeaponBaseInput,
} from "../../components/components_index";

import { parseUniqueItems } from "../../components/ParsingInputs/util/parseUniques";
import { parseRunewords } from "../../components/ParsingInputs/util/parseRunewords";

import { combineAll } from "../../components/ParsingInputs/util/combineAll";

export const App = () => {
  const [itemCategory, setItemCategory] = useState(0);
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

  const showItemInput = () => {
    const { properties, item_stat } = jsonFiles;
    if (properties && item_stat && itemCategory === 0) {
      return (
        <>
          <h5>
            Has some special handling in conversion to filter out non-item
            entries in the .txt as well as items that aren't actually
            "completed" or in the game.
          </h5>
          <UniqueInput setJsonFiles={setJsonFiles} />
        </>
      );
    } else if (properties && item_stat && itemCategory === 1) {
      return (
        <>
          <h5>
            Has some special handling in conversion to filter out items that
            aren't actually "completed" or in the game.
          </h5>
          <RunewordInput setJsonFiles={setJsonFiles} />
        </>
      );
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <h5>
          Converts raw .txt file into JSON and prints it on screen. No special
          handling in the conversion.
        </h5>
        <StringInput setJsonFiles={setJsonFiles} />
      </div>

      <div className="input-container">
        <h5>
          Converts raw .txt file into JSON, puts together armor base object, and
          prints on screen.
        </h5>
        <ArmorBaseInput setJsonFiles={setJsonFiles} />
      </div>

      <div className="input-container">
        <h5>
          Converts raw .txt file into JSON, puts together weapon base object,
          and prints on screen.
        </h5>
        <WeaponBaseInput setJsonFiles={setJsonFiles} />
      </div>

      <div className="input-container">
        <h5>
          Converts and stores JSON result in application state. Both
          Properties.txt and ItemStatCost.txt are required for generating items.
          No special handling in conversions.
        </h5>
        <PropertiesInput setJsonFiles={setJsonFiles} />
        <ItemStatInput setJsonFiles={setJsonFiles} />
      </div>

      {jsonFiles.properties && jsonFiles.item_stat ? (
        <div className="input-container">
          <h5>Item Category</h5>
          <div className="item-category-buttons">
            <button onClick={() => setItemCategory(0)}>uniques</button>
            <button onClick={() => setItemCategory(1)}>runewords</button>
            <button disabled onClick={() => setItemCategory(2)}>
              sets
            </button>
          </div>
          {showItemInput()}
        </div>
      ) : null}

      <div className="input-container">
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
      </div>
      <div className="input-container">
        <h5>Combines resulting Uniques or Sets with matching item base.</h5>
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
