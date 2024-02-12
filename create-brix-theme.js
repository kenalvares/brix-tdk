#!/usr/bin/env node

const path = require("path");
const fs = require("fs");


if (process.argv.length < 3 || process.argv.length > 3) {
    console.log(
      "Please only enter a single theme name like:\n\t\tnpx create-brix-theme myThemeName\n\t\tnpx create-brix-theme my-theme-name"
    );
    process.exit(1);
  }

const projectName = process.argv[2];
process.chdir("..");
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

async function main() {

  try {
    console.log("Creating theme folder...");
    fs.mkdirSync(projectPath);
    console.log("Created /" + projectPath);
    process.chdir(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `/${projectName} already exists in the current directory, please give your theme another name.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }

  try {
    console.log("Creating style.css ...");
    fs.writeFileSync("./style.css", '/* CSS File */');
  } catch (err) {
    console.log(error);
  }

  try {
    console.log("Creating functions.php ...");
    fs.writeFileSync("./functions.php", '/* PHP File */');
  } catch (err) {
    console.log(error);
  }

  try {
    console.log("Moving to theme...");

    process.chdir(projectPath);

    console.log("Your Brix Theme is ready for use!");
  } catch (error) {
    console.log(error);
  }
}
main();
