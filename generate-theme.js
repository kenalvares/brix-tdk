#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Please only enter a single theme name like:\n\t\tnpx create-brix-theme myThemeName");
  process.exit(1);
}

const projectName = process.argv[2];
process.chdir("..");
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

try {
    console.log("Creating theme folder...")
    fs.mkdirSync(projectPath);
    console.log("Created /" + projectPath);
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

async function main() {
  try {
    console.log("Creating theme files...");
    
    process.chdir(projectPath);
    process

    console.log("Your Brix Theme is ready for use!");
  } catch (error) {
    console.log(error);
  }
}
main();
