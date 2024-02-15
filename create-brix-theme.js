#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const slug = require("lodash");
const prompt = require("prompt-sync")({ sigint: true });
let theme = {};

// Returns the name of the project entered when typing `npx create-brix-theme <project-name>`
function getProjectName() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log(
      "(!) Please only enter a name without spaces or a name with spaces inside double quotes like:"
    );
    console.log("    npx create-brix-theme myThemeName");
    console.log('    npx create-brix-theme "My Theme Name"');
    process.exit(1);
  } else {
    return process.argv[2];
  }
}

// Removes all whitespaces in a string
function removeWhiteSpaces(str) {
  return str.replace(/\s+/g, '');
}

// Returns the path to the newly generated theme
function getProjectPath(str) {
  process.chdir("..");
  return path.join(process.cwd(), str);
}

// Returns Theme URI after basic formatting and validation
function getThemeUri() {
  let str = prompt("\n* Enter your Theme URL: ");
  str = removeWhiteSpaces(str);
  if(str.length <= 0 || str == "" || str == undefined || str == null) {
    return ""
  }
  return str;
}

// Returns Author Name
function getAuthor() {
  return prompt("\n* Enter Author Name: ");
}

// Returns Author URI after basic formatting and validation
function getAuthorUri() {
  let str = prompt("\nEnter Author URL: ");
  str = removeWhiteSpaces(str);
  if(str.length <= 0 || str == "" || str == undefined || str == null) {
    return ""
  }
  return str;
}

// Returns Description
function getDescription() {
  return prompt("\nEnter Theme Description: ");
}

// Returns minimum required version of WordPress
function getRequiredWp() {
  return prompt("\nEnter minimum WordPress version requied: ");
}

// Returns maximum tested version of WordPress
function getTestedWp() {
  return prompt("\nEnter last WordPress version tested: ");
}

// Returns minimum required version of PHP
function getRequiredPhp() {
  return prompt("\nEnter minimum PHP version required: ");
}

// Returns License Name
function getLicense() {
  return prompt("\nEnter License Name: ");
}

// Returns License URI after basic formatting and validation
function getLicenseUri() {
  let str = prompt("\nEnter License URI: ");
  str = removeWhiteSpaces(str);
  if(str.length <= 0 || str == "" || str == undefined || str == null) {
    return ""
  }
  return str;
}

// Creates parent theme folder after basic formatting and validation
function createThemeFolder(name, dir) {
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

// Creates config folder and theme.json to store config info
function createConfig(obj) {
  try {
    console.log("\n* Creating /config folder");
    fs.mkdirSync("./config");
    console.log("    - Successfully created /config");
  } catch (err) {
    console.log(err);
  }

  try {
    console.log("\n* Creating theme.json");
    fs.writeFileSync("./config/theme.json", JSON.stringify(obj));
    console.log("    - Successfully created theme.json");
  } catch (err) {
    console.log(err);
  }
}

// Parses `theme` object into stylesheet header for WordPress
function getStylesheetContent(obj) {
  return `/*
  Theme Name: ${obj.name}
  Theme URI: ${obj.uri}
  Author: ${obj.author}
  Author URI: ${obj.author_uri}
  Description: ${obj.description}
  Version: ${obj.version}
  Requires at least: ${obj.required_wp}
  Tested up to: ${obj.tested_wp}
  Requires PHP: ${obj.required_php}
  License: ${obj.license}
  License URI: ${obj.license_uri}
  Text Domain: ${obj.slug}
  This theme is powered by the Brix Theme Development Kit (TDK)
*/`;
}

// Creates style.css
function createStyles(str) {
  try {
    console.log("\n* Creating style.css");
    fs.writeFileSync("./style.css", str);
    console.log("\t- Successfully created style.css");
  } catch (err) {
    console.log(err);
  }
}

// Creates function.php
function createFunctions() {
  try {
    console.log("\n* Creating functions.php");
    fs.writeFileSync("./functions.php", "// PHP File");
    console.log("\t- Successfully created functions.php");
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  theme.name = getProjectName();
  theme.slug = slug.kebabCase(theme.name);
  theme.uri = getThemeUri();
  theme.author = getAuthor();
  theme.author_uri = getAuthorUri();
  theme.description = getDescription();
  theme.version = "1.0.0";
  theme.required_wp = getRequiredWp();
  theme.tested_wp = getTestedWp();
  theme.required_php = getRequiredPhp();
  theme.license = getLicense();
  theme.license_uri = getLicenseUri();
  const projectPath = getProjectPath(theme.name);

  createThemeFolder(theme.name, projectPath);

  createConfig(theme);

  createStyles(getStylesheetContent(theme));

  createFunctions();

  try {
    console.log("\n* Moving to theme...");
    process.chdir(projectPath);
    console.log("\n* Your Brix Theme is ready for use!");
  } catch (error) {
    console.log(error);
  }
}
main();
