# PD2 Text Parser

This application is meant to take the raw .txt files and translate their contents to useable JSON that can be stored in an API and used for other applications.

The objective is to be able to create the handling necessary to not have to alter the .txt files in anyway in order to create accurate results so for ease of use and the ability to update an API quickily as updates are released for PD2. The .txts used are redacted distributable versions prepped by the PD2 team, so there are some .txts missing or we have not recieved yet. This also means based on the current methods, whenever something from the contents of these files changes on PD2s end, we also would need an updated version from them.

## Current Functionality

There are currently 5 main basic inputs and some conditional inputs. The results of these inputs are printed on screen for review and gives a user the ability to copy/paste the text into a JSON file. There will eventually be an export functionality to skip the copy/paste step, but for now, this works while the results are not perfect.

Raw .txt files used with this application are in the `text-files` folder. Armor.csv is the only one that has had any changes made due to a duplicate column that was overwriting the value of the previous column that shares the same key name after being converted to JSON. I'll include the raw Armor.txt as well since this handling should be made as part of the converting to JSON process to prep the document. You'll notice there are two columns for mindam and maxdamn, the duplicate and empty ones being the very last columns of the .txt file.

- **Strings/Print JSON** - Will take any .txt file and convert it into JSON without any special handling. Raw txt to raw JSON.

- **Armor.txt** - Takes the Armor.txt file and converts it into JSON. There is a small amount of specific handling that takes place during the conversion to make the results useable for other parsing methods.

- **Weapons.txt** - Takes the Weapons.txt file and converts it into JSON. There is a small amount of specific handling that takes place during the conversion to make the results useable for other parsing methds.

- **Properties.txt** - Takes the Properties.txt file and converts it into JSON. No special handling takes place during the conversion.

- **ItemStatCost.txt** - Takes the ItemStatCost.txt file and converts it into JSON. No special handling takes place during the conversion.

- **UniqueItems.txt** - Input is hidden until after Properties.txt and ItemStatCost.txt have been parsed and converted as these are required files for the process. There is some special handling that takes place to clean up the raw JSON result to make the result useable for other parsing methods.

- **Runes.txt** - Input is hidden until after Properties.txt and ItemStatCost.txt have been parsed and converted as these are required files for the process. There is some special handling that takes place to clean up the raw JSON result to make the result useable for other parsing methods.

## Pre-Parsed and Internally Used Files

There are some .txts that have already been converted and are stored internally as JSON files that are used for the other parsing processes. These files are ones that are likely to never really change but are necessary to reference for values throughout other processes.

- **AllStrings.json** - Contains all of the strings used within the game and id's associated wit those strings. Used in all processing.

- **gems.json** - Contains all runes and gems properties in relation to Properties.txt and ItemStatCost.txt. Used in the Runeword processing.

- **runes.json** - Contains individual rune data, including their name, string reference id, and level requirement. Used in the Runeword processing.

- **skillIds.json** - Contains all individual skills names and ids for reference. Used in Runewords, UniqueItems, and soon Sets processing.

- **skilltab.json** - Similar to skillIds, contains names and identifiers for skill trees. Used in Runewords, UniqueItems, and soon Sets processing.

## Utility and Reference

There are multiple utility functions being built out that are used throughout the main parsing processes that either fill in gaps in the .txt or fix/handle inconsistencies throughout the txts. Some strings are hardcoded in the game itself somewhere or aren't explicitly set between the ItemStatCosts.txt and allStrings.json.

### Functions

- **classSkillsUtil.js** - Handles translating column values from the txts that are indicate adding to all skills of a particular class. There doesn't appear to be an associated id and reference for each class throughout the other files, so I filled in the gap myself by creating a utility function.

- **descFuncs.js** - These are reproductions of the functions used within D2 itself to put together string templates, their ordering, and the injected values.

- **combineUniques** - This currently uses parsed results that are stored as JSON to combine unique item results with item base results. No parsing or uploading necessary. Will be adapted as part of the process after uploading ItemStatCost.txt and Properties.txt and then either UniqueItems.txt or SetItems.txt to create full item objects with all necessary properties.

### Reference

- **itemstat.json** - Previously parsed JSON for the ItemStatCosts.txt to be able to reference/find values while working out parsing methods.

- **properties.json** - Previously pasrsed JSON for Properties.txt to be able to reference/find values while working out parsing methods.
