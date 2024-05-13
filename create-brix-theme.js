#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import _ from "lodash";
import promptSync from "prompt-sync";
import { removeWhiteSpaces } from "./helpers/formatters.mjs";
import { createFile } from "./helpers/file-managers.mjs";
import getStylesheetHeader from "./templates/style-head.mjs";
import getMainStyles from "./templates/style.mjs";
import getRtlStyles from "./templates/style-rtl.mjs";
import getFunctionsContent from "./templates/functions-php.mjs";
import getIndexContent from "./templates/index-php.mjs";
import getSidebarContent from "./templates/sidebar-php.mjs";
import getSearchContent from "./templates/search-php.mjs";
import getArchiveContent from "./templates/archive-php.mjs";
import getCommentsContent from "./templates/comments-php.mjs";
import getFooterContent from "./templates/footer-php.mjs";
let brixConfig = {};
const prompt = promptSync({ sigint: true });

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
};

// Returns the path to the newly generated theme
const getThemePath = (str) => path.join(process.cwd(), str);

// Returns Theme URI after basic formatting and validation
const getThemeUri = () => {
  const str = removeWhiteSpaces(prompt("\n* Enter your Theme URL: "));
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "";
  }
  return str;
};

// Returns Author Name
const getThemeAuthorName = () => {
  const str = prompt("\n* Enter Author Name: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "";
  }
  return str;
};

// Returns Author URI after basic formatting and validation
const getThemeAuthorUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter Author URL: "));
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "";
  }
  return str;
};

// Returns Description
const getThemeDescription = () => {
  const str = prompt("\nEnter Theme Description: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "";
  }
  return str;
};

// Returns minimum required version of WordPress
const getThemeRequiredWp = () => {
  const str = prompt("\nEnter minimum WordPress version required: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "5.4";
  }
  return str;
};

// Returns maximum tested version of WordPress
const getThemeTestedWp = () => {
  const str = prompt("\nEnter last WordPress version tested: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "5.4";
  }
  return str;
};

// Returns minimum required version of PHP
const getThemeRequiredPhp = () => {
  const str = prompt("\nEnter minimum PHP version required: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "5.6";
  }
  return str;
};

// Returns License Name
const getThemeLicenseName = () => {
  const str = prompt("\nEnter License Name: ");
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "GNU General Public License v2 or later";
  }
  return str;
};

// Returns License URI after basic formatting and validation
const getThemeLicenseUri = () => {
  const str = removeWhiteSpaces(prompt("\nEnter License URI: "));
  if (str.length <= 0 || str == "" || str == undefined || str == null) {
    return "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";
  }
  return str;
};

// Creates parent theme folder after basic formatting and validation
const createThemeFolder = (name, dir) => {
  try {
    fs.mkdirSync(dir);
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
};

// Creates config folder and brix-config.json to store config info
const createConfig = (obj) => {
  try {
    fs.mkdirSync("./config");
    fs.writeFileSync("./config/brix-config.json", JSON.stringify(obj));
  } catch (err) {
    console.log(err);
  }
};

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
  createThemeFolder(brixConfig.themeName, themePath);
  createConfig(brixConfig);

  createFile(
    "style",
    "css",
    getStylesheetHeader(brixConfig).concat(getMainStyles())
  );
  createFile(
    "style-rtl",
    "css",
    getStylesheetHeader(brixConfig).concat(getRtlStyles())
  );
  createFile("functions", "php", getFunctionsContent(brixConfig));
  createFile("index", "php", getIndexContent(brixConfig));
  createFile("sidebar", "php", getSidebarContent(brixConfig));
  createFile("search", "php", getSearchContent(brixConfig));
  createFile("archive", "php", getArchiveContent(brixConfig));
  createFile("comments", "php", getCommentsContent(brixConfig));
  createFile("footer", "php", getFooterContent(brixConfig));
};

main();
