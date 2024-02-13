#!/usr/bin/env node

console.log("Create Brix Theme\n------");

const path = require("path");
const fs = require("fs");
const slug = require("lodash");
let theme = {};

if (process.argv.length < 3 || process.argv.length > 3) {
  console.log("(!) Please only enter a name without spaces or a name with spaces inside double quotes like:");
  console.log("\t\tnpx create-brix-theme myThemeName");
  console.log('\n\t\tnpx create-brix-theme "My Theme Name"');
  process.exit(1);
}

const projectName = process.argv[2];
process.chdir("..");
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

theme.name = projectName;
theme.slug = slug.kebabCase(projectName);


let styleCss = `/*\nTheme Name: ${theme.name}\nTheme URI: \nAuthor: \nAuthor URI: \nDescription: \nVersion: \nRequires at least: 5.0\nTested up to: 6.4.3\nRequires PHP: 7.0\nLicense: GNU General Public License v2 or later\nLicense URI: http://www.gnu.org/licenses/gpl-2.0.html\nText Domain: ${theme.slug}\nThis theme is powered by the Brix Theme Development Kit (TDK)\n*/`;

function createThemeFolder(name, dir) {
  try {
    console.log("\n* Creating theme folder");
    fs.mkdirSync(dir);
    console.log("\t- Successfully created /" + dir);
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

function createConfig() {
  try {
    console.log("\n* Creating /config folder");
    fs.mkdirSync("./config");
    console.log("\t- Successfully created /config");
  } catch (err) {
    console.log(err);
  }

  try {
    console.log("\n* Creating theme.json");
    fs.writeFileSync("./config/theme.json", JSON.stringify(theme));
    console.log("\t- Successfully created theme.json");
  } catch (err) {
    console.log(err);
  }
}

function createStyles() {
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
  createThemeFolder(projectName, projectPath);

  createConfig();

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
