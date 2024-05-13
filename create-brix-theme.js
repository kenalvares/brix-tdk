#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const prompt = require("prompt-sync")({ sigint: true });
let brixConfig = {};

// Returns the name of the project entered when typing `npx create-brix-theme <project-name>`
const getThemeName = () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log(
      "(!) Please only enter a name without spaces or a name with spaces inside double quotes like:"
    );
    console.log("    npx create-brix-theme myThemeName");
    console.log('    npx create-brix-theme "My Theme Name"');
    process.exit(1);
  } else {
    process.chdir("..");
    return process.argv[2];
  }
}

// Removes all whitespaces in a string
const removeWhiteSpaces = str => str.replace(/\s+/g, '');

// Returns the path to the newly generated theme
const getThemePath = str => path.join(process.cwd(), str);

// Returns Theme URI after basic formatting and validation
const getThemeUri = () => {
  const str = removeWhiteSpaces(prompt("\n* Enter your Theme URL: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "";}
  return str;
}

// Returns Author Name
const getThemeAuthorName = () => prompt("\n* Enter Author Name: ");

// Returns Author URI after basic formatting and validation
const getThemeAuthorUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter Author URL: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "";}
  return str;
}

// Returns Description
const getThemeDescription = () => prompt("\nEnter Theme Description: ");

// Returns minimum required version of WordPress
const getThemeRequiredWp = () => {
  const str = prompt("\nEnter minimum WordPress version requied: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.4";}
  return str;
}

// Returns maximum tested version of WordPress
const getThemeTestedWp = () => {
  const str = prompt("\nEnter last WordPress version tested: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.4";}
  return str;
}

// Returns minimum required version of PHP
const getThemeRequiredPhp = () => {
  const str = prompt("\nEnter minimum PHP version required: ");
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "5.6";}
  return str;
}

// Returns License Name
const getThemeLicenseName = () => {
  const str = prompt("\nEnter License Name: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {return "GNU General Public License v2 or later";}
  return str;
}

// Returns License URI after basic formatting and validation
const getThemeLicenseUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter License URI: "));
  if(str.length <= 0 || str == "" || str == undefined || str == null) {return "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";}
  return str;
}

// Creates parent theme folder after basic formatting and validation
const createThemeFolder = (name, dir) => {
  try {
    console.log("\n* Creating theme folder");
    fs.mkdirSync(dir);
    console.log("    - Successfully created /" + dir);
    process.chdir(dir);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `(!) '${name}' already exists in the current directory, please give your theme another name.`
      );
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}

// Creates config folder and brix-config.json to store config info
const createConfig = obj => {
  try {
    console.log("\n* Creating /config folder");
    fs.mkdirSync("./config");
    console.log("    - Successfully created /config");
  } catch (err) {
    console.log(err);
  }

  try {
    console.log("\n* Creating brix-config.json");
    fs.writeFileSync("./config/brix-config.json", JSON.stringify(obj));
    console.log("    - Successfully created brix-config.json");
  } catch (err) {
    console.log(err);
  }
}

// Parses `brixConfig` object into stylesheet header for WordPress
const getStylesheetHeader = obj => {
  return `/*
  Theme Name: ${obj.themeName}
  Theme URI: ${obj.themeUri}
  Author: ${obj.themeAuthorName}
  Author URI: ${obj.themeAuthorUri}
  Description: ${obj.themeDescription}
  Version: ${obj.themeVersion}
  Requires at least: ${obj.themeRequiredWp}
  Tested up to: ${obj.themeTestedWp}
  Requires PHP: ${obj.themeRequiredPhp}
  License: ${obj.themeLicenseName}
  License URI: ${obj.themeLicenseUri}
  Text Domain: ${obj.themeSlug}
  This theme is powered by the Brix Theme Development Kit (TDK), based on Underscores https://underscores.me/, (C) 2012-2020 Automattic, Inc. Underscores is distributed under the terms of the GNU GPL v2 or later. Normalizing styles have been helped along thanks to the fine work of Nicolas Gallagher and Jonathan Neal https://necolas.github.io/normalize.css/
*/\n\n`;
}

const getMainStyles = () => fs.readFileSync(process.cwd() + '/brix-tdk/templates/style.css', 'utf8');

const getRtlStyles = () => fs.readFileSync(process.cwd() + '/brix-tdk/templates/style-rtl.css', 'utf8');

// Creates style.css
const createFile = (name, format, content) => {
  try {
    console.log(`\n* Creating name.${format}`);
    fs.writeFileSync(`./${name}.${format}`, content);
    console.log(`\t- Successfully created ${name}.${format}`);
  } catch (err) {
    console.log(err);
  }
}

const getFunctionsContent = require(process.cwd() + '/templates/functions-php.js')

const getIndexContent = require(process.cwd() + '/templates/index-php.js');

// Main function
const main = () => {
  brixConfig.themeName = getThemeName();
  const themePath = getThemePath(brixConfig.themeName);
  brixConfig.themeSlug = _.snakeCase(brixConfig.themeName);
  brixConfig.themeUri = getThemeUri();
  brixConfig.themeAuthorName = getThemeAuthorName();
  brixConfig.themeAuthorUri = getThemeAuthorUri();
  brixConfig.themeDescription = getThemeDescription();
  brixConfig.themeVersion = "1.0.0";
  brixConfig.themeRequiredWp = getThemeRequiredWp();
  brixConfig.themeTestedWp = getThemeTestedWp();
  brixConfig.themeRequiredPhp = getThemeRequiredPhp();
  brixConfig.themeLicenseName = getThemeLicenseName();
  brixConfig.themeLicenseUri = getThemeLicenseUri();

  brixConfig.initialContent = {};
  brixConfig.initialContent.style = getStylesheetHeader(brixConfig).concat(getMainStyles());
  brixConfig.initialContent.styleRtl = getStylesheetHeader(brixConfig).concat(getRtlStyles());
  brixConfig.initialContent.functions = getFunctionsContent(brixConfig);
  brixConfig.initialContent.index = getIndexContent(brixConfig);

  createThemeFolder(brixConfig.themeName, themePath);

  createFile("style", "css", brixConfig.initialContent.style);

  createFile("style-rtl", "css", brixConfig.initialContent.styleRtl);

  createFile("functions", "php", brixConfig.initialContent.functions);
  
  createFile("index", "php", brixConfig.initialContent.index);

  delete brixConfig.initialContent;

  createConfig(brixConfig);

  try {
    console.log(`\n* Your Brix Theme is ready for use!\nTry 'cd ${themePath}'`);
  } catch (error) {
    console.log(error);
  }

  // console.log(themePath, brixConfig.themeAuthorName, brixConfig.themeUri);
}

main();