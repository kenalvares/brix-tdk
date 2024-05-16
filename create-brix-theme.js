#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import _ from "lodash";
import promptSync from "prompt-sync";
import child_process from "child_process";

let brixConfig = {};
let source = "";
const prompt = promptSync({ sigint: true });

import { removeWhiteSpaces, removeLastFolder } from "./helpers/formatters.mjs"; // Formatting related functions
import { createFile } from "./helpers/file-managers.mjs"; // File management functions

import getStylesheetHeader from "./templates/style-head.mjs"; // Header for stylesheets
import getStyleCssCode from "./templates/style-css.mjs"; // style.css
import getStyleRtlCssCode from "./templates/style-rtl-css.mjs"; //style-rtl.css

import getFunctionsPhpCode from "./templates/functions-php.mjs"; // functions.php
import getIndexPhpCode from "./templates/index-php.mjs"; // index.php
import getSidebarPhpCode from "./templates/sidebar-php.mjs"; // sidebar.php
import getSearchPhpCode from "./templates/search-php.mjs"; // search.php
import getArchivePhpCode from "./templates/archive-php.mjs"; // archive.php
import get404PhpCode from "./templates/404-php.mjs"; // 404.php
import getCommentsPhpCode from "./templates/comments-php.mjs"; // comments.php
import getFooterContent from "./templates/footer-php.mjs";
import getHeaderContent from "./templates/header-php.mjs";
import getPageContent from "./templates/page-php.mjs";
import getSingleContent from "./templates/single-php.mjs";

import getCustomHeaderContent from "./templates/inc/custom-header-php.mjs";
import getCustomizerContent from "./templates/inc/customizer-php.mjs";
import getJetpackContent from "./templates/inc/jetpack-php.mjs";
import getTemplateFunctionsContent from "./templates/inc/template-functions-php.mjs";
import getTemplateTagsContent from "./templates/inc/template-tags-php.mjs";

import getCustomizerJsContent from "./templates/js/customizer-js.mjs";
import getNavigationJsContent from "./templates/js/navigation-js.mjs";

import getTemplatePartsContentContent from "./templates/template-parts/content-php.mjs";
import getTemplatePartsContentNoneContent from "./templates/template-parts/content-none-php.mjs";
import getTemplatePartsContentPageContent from "./templates/template-parts/content-page-php.mjs";
import getTemplatePartsContentSearchContent from "./templates/template-parts/content-search-php.mjs";

import getStylesScssContent from "./scss/styles-scss.mjs";
import getVendorDirScssContent from "./scss/vendors/vendor-dir-scss.mjs";
import getAbstractsDirScssContent from "./scss/abstracts/abstracts-dir-scss.mjs";
import getFontsScssContent from "./scss/abstracts/fonts-scss.mjs";
import getVariablesScssContent from "./scss/abstracts/variables-scss.mjs";
import getMixinsScssContent from "./scss/abstracts/mixins-scss.mjs";
import getBaseDirScssContent from "./scss/base/base-dir-scss.mjs";
import getResetScssContent from "./scss/base/reset-scss.mjs";
import getTypographyScssContent from "./scss/base/typography-scss.mjs";
import getComponentsDirScssContent from "./scss/components/components-dir-scss.mjs";
import getLayoutsDirScssContent from "./scss/layouts/layouts-dir-scss.mjs";
import getPackageJsonContent from "./templates/package-json.mjs";
import getGulpfileJsContent from "./templates/gulpfile-js.mjs";

// Returns the name of the project entered when typing `npx create-brix-theme <project-name>`
const getThemeName = () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log("(!) Please use:");
    console.log("    npx create-brix-theme myThemeName");
    console.log("    npx create-brix-theme \"My Theme Name\"");
    process.exit(1);
  } else {
    return process.argv[2];
  }
};

// Returns the path to the newly generated theme
const getThemePath = (str) => path.join(removeLastFolder(source), str)

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
const createThemeFolders = (name, dir) => {
  try {
    fs.mkdirSync(dir);
    fs.mkdirSync(dir + "-dev");
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
  source = process.cwd();
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
  createThemeFolders(brixConfig.themeName, themePath);
  createConfig(brixConfig);

  createFile(
    "style",
    "css",
    getStylesheetHeader(brixConfig).concat(getStyleCssCode())
  );
  createFile(
    "style-rtl",
    "css",
    getStylesheetHeader(brixConfig).concat(getStyleRtlCssCode())
  );
  createFile("404", "php", get404PhpCode(brixConfig));
  createFile("archive", "php", getArchivePhpCode(brixConfig));
  createFile("comments", "php", getCommentsPhpCode(brixConfig));
  createFile("footer", "php", getFooterContent(brixConfig));
  createFile("functions", "php", getFunctionsPhpCode(brixConfig));
  createFile("header", "php", getHeaderContent(brixConfig));
  createFile("index", "php", getIndexPhpCode(brixConfig));
  createFile("page", "php", getPageContent(brixConfig));
  createFile("search", "php", getSearchPhpCode(brixConfig));
  createFile("sidebar", "php", getSidebarPhpCode(brixConfig));
  createFile("single", "php", getSingleContent(brixConfig));

  fs.mkdirSync(process.cwd() + "/inc");
  process.chdir(process.cwd() + "/inc");

  createFile("custom-header", "php", getCustomHeaderContent(brixConfig));
  createFile("customizer", "php", getCustomizerContent(brixConfig));
  createFile("jetpack", "php", getJetpackContent(brixConfig));
  createFile(
    "template-functions",
    "php",
    getTemplateFunctionsContent(brixConfig)
  );
  createFile("template-tags", "php", getTemplateTagsContent(brixConfig));

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/js");
  process.chdir(process.cwd() + "/js");
  createFile("customizer", "js", getCustomizerJsContent(brixConfig));
  createFile("navigation", "js", getNavigationJsContent(brixConfig));

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/template-parts");
  process.chdir(process.cwd() + "/template-parts");
  createFile("content", "php", getTemplatePartsContentContent(brixConfig));
  createFile(
    "content-none",
    "php",
    getTemplatePartsContentNoneContent(brixConfig)
  );
  createFile(
    "content-page",
    "php",
    getTemplatePartsContentPageContent(brixConfig)
  );
  createFile(
    "content-search",
    "php",
    getTemplatePartsContentSearchContent(brixConfig)
  );

  process.chdir("..");
  process.chdir("..");
  process.chdir(process.cwd() + "/" + brixConfig.themeName + "-dev");
  createFile("package", "json", getPackageJsonContent(brixConfig));
  child_process.execSync(
    "npm install --save-dev gulp sass gulp-sass gulp-concat process",
    { stdio: [0, 1, 2] }
  );
  createFile("gulpfile", "js", getGulpfileJsContent(brixConfig));

  fs.mkdirSync(process.cwd() + "/scss");
  process.chdir(process.cwd() + "/scss");

  fs.mkdirSync(process.cwd() + "/abstracts");
  process.chdir(process.cwd() + "/abstracts");
  createFile("__abstracts-dir", "scss", getAbstractsDirScssContent(brixConfig));
  createFile("_fonts", "scss", getFontsScssContent(brixConfig));
  createFile("_variables", "scss", getVariablesScssContent(brixConfig));
  createFile("_mixins", "scss", getMixinsScssContent(brixConfig));

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/base");
  process.chdir(process.cwd() + "/base");
  createFile("__base-dir", "scss", getBaseDirScssContent(brixConfig));
  createFile("_reset", "scss", getResetScssContent(brixConfig));
  createFile("_typography", "scss", getTypographyScssContent(brixConfig));

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/components");
  process.chdir(process.cwd() + "/components");
  createFile(
    "__components-dir",
    "scss",
    getComponentsDirScssContent(brixConfig)
  );

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/layouts");
  process.chdir(process.cwd() + "/layouts");
  createFile("__layouts-dir", "scss", getLayoutsDirScssContent(brixConfig));

  process.chdir("..");
  fs.mkdirSync(process.cwd() + "/vendor");
  process.chdir(process.cwd() + "/vendor");
  createFile("__vendor-dir", "scss", getVendorDirScssContent(brixConfig));

  process.chdir("..");
  createFile("styles", "scss", getStylesScssContent(brixConfig));

  console.log(
    `\n\n'${brixConfig.themeName}' is ready.\nTry cd "../${brixConfig.themeName}-dev"`
  );
};

main();
