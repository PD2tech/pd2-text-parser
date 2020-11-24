# PD2 Text Parser

This application is meant to take the raw .txt files and translate their contents to useable JSON that can be stored in an API and used for other applications.

The objective is to be able to create the handling necessary to not have to alter the .txt files in anyway in order to create accurate results so for ease of use and ability to update data overtime and as updates are released for PD2.

## Current Functionality

There are currently 5 main basic inputs and some conditional inputs. The results of these inputs is printed on screen for review and gives a user the ability to copy/paste the text into a JSON file. There will eventually be an export functionality to skip the copy/paste step, but for now, this works while the results are not perfect.

- **Strings/Print JSON** - Will take any .txt file and convert it into JSON without any special handling. Raw txt to raw JSON.

- **Armor.txt** - Takes the Armor.txt file and converts it into JSON. There is a small amount of specific handling that takes place during the conversion to make the results useable for other parsing methods.

- **Weapons.txt** - Takes the Weapons.txt file and converts it into JSON. There is a small amount of specific handling that takes place during the conversion to make the results useable for other parsing methds.

- **Properties.txt** - Takes the Properties.txt file and converts it into JSON. No special handling takes place during the conversion.

- **ItemStatCost.txt** - Takes the ItemStatCost.txt file and converts it into JSON. No special handling takes place during the conversion.

- **UniqueItems.txt** - Will be available after Properties.txt and ItemStatCost.txt have been parsed and converted as these are required files for the process. There is some special handling that takes place to clean up the raw JSON result to make the result useable for other parsing methods.

- **Runes.txt** - Will be available after Properties.txt and ItemStatCost.txt have been parsed and converted as these are required files for the process. There is some special handling that takes place to clean up the raw JSON result to make the result useable for other parsing methods.

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

### Reference

- **itemstat.json** - Previous parsed JSON for the ItemStatCosts.txt to be able to reference/find values while working out parsing methods.

- **properties.json** - Previous pasrsed JSON for Properties.txt to be able to reference/find values while working out parsing methods.
