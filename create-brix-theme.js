#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const slug = require("lodash");
const prompt = require('prompt-sync')({sigint: true});
let theme = {};

function getProjectName() {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("(!) Please only enter a name without spaces or a name with spaces inside double quotes like:");
    console.log("    npx create-brix-theme myThemeName");
    console.log('    npx create-brix-theme "My Theme Name"');
    process.exit(1);
  } else {
    return process.argv[2];
  }
}

function getProjectPath(str) {
  process.chdir("..");
  return path.join(process.cwd(), str)
}

function getThemeUri() {
  return prompt("\n* Enter your Theme URL: ");
}

function getAuthor() {
  return prompt("\n* Enter Author Name: ");
}

function getAuthorUri() {
  return prompt("\nEnter Author URL: ");
}

function getDescription() {
  return prompt("\nEnter Theme Description: ");
}

function getRequiredWp() {
  return prompt("\nEnter minimum WordPress version requied: ");
}

function getTestedWp() {
  return prompt("\nEnter last WordPress version tested: ");
}

function getRequiredPhp() {
  return prompt("\nEnter minimum PHP version required: ");
}

function getLicense() {
  return prompt("\nEnter License Name: ");
}

function getLicenseUri() {
  return prompt("\nEnter License URI: ");
}

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

function getStylesheetContent() {
  return `/*
  Theme Name: ${theme.name}
  Theme URI: ${theme.uri}
  Author: ${theme.author}
  Author URI: ${theme.author_uri}
  Description: ${theme.description}
  Version: ${theme.version}
  Requires at least: ${theme.requires_wp}
  Tested up to: ${theme.tested_wp}
  Requires PHP: ${theme.requires_php}
  License: ${theme.license}
  License URI: ${theme.license_uri}
  Text Domain: ${theme.slug}
  This theme is powered by the Brix Theme Development Kit (TDK)
*/`;
}

function createStyles() {
  let styleCss = getStylesheetContent();
  try {
    console.log("\n* Creating style.css");
    fs.writeFileSync("./style.css", styleCss);
    console.log("\t- Successfully created style.css");
  } catch (err) {
    console.log(err);
  }
}

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

  createStyles();

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
