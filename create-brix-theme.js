#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import _ from "lodash";
import promptSync from "prompt-sync";
import child_process from "child_process";

let brixConfig = {};
let source = "";
const prompt = promptSync({ sigint: true });

import {
  removeWhiteSpaces,
  removeLastFolder,
  isUserInBrixFolder,
} from "./helpers/formatters.mjs"; // Formatting related functions
import { createFile } from "./helpers/file-managers.mjs"; // File management functions

import getStyleRtlCssCode from "./templates/style-rtl-css.mjs"; //style-rtl.css

import getFunctionsPhpCode from "./templates/functions-php.mjs"; // functions.php
import getIndexPhpCode from "./templates/index-php.mjs"; // index.php
import getSidebarPhpCode from "./templates/sidebar-php.mjs"; // sidebar.php
import getSearchPhpCode from "./templates/search-php.mjs"; // search.php
import getArchivePhpCode from "./templates/archive-php.mjs"; // archive.php
import get404PhpCode from "./templates/404-php.mjs"; // 404.php
import getCommentsPhpCode from "./templates/comments-php.mjs"; // comments.php
import getFooterPhpCode from "./templates/footer-php.mjs"; // footer.php
import getHeaderPhpCode from "./templates/header-php.mjs"; // header.php
import getPagePhpCode from "./templates/page-php.mjs"; // page.php
import getSinglePhpCode from "./templates/single-php.mjs"; // single.php

import getCustomHeaderPhpCode from "./templates/inc/custom-header-php.mjs"; // custom-header.php
import getCustomizerPhpCode from "./templates/inc/customizer-php.mjs"; // customizer.php
import getJetpackPhpCode from "./templates/inc/jetpack-php.mjs"; // jetpack.php
import getTemplateFunctionsPhpCode from "./templates/inc/template-functions-php.mjs"; // template-functions.php
import getTemplateTagsPhpCode from "./templates/inc/template-tags-php.mjs"; // template-tags.php

import getCustomizerJsCode from "./templates/js/customizer-js.mjs"; // customizer.js
import getNavigationJsCode from "./templates/js/navigation-js.mjs"; // navigation.js

import getTemplatePartsContentPhpCode from "./templates/template-parts/content-php.mjs"; // template-parts/content.php
import getTemplatePartsContentNonePhpCode from "./templates/template-parts/content-none-php.mjs"; // template-parts/content-none.php
import getTemplatePartsContentPagePhpCode from "./templates/template-parts/content-page-php.mjs"; // template-parts/content-page.php
import getTemplatePartsContentSearchPhpCode from "./templates/template-parts/content-search-php.mjs"; // template-parts/content-search.php

import getStylesScssCode from "./scss/styles-scss.mjs"; // styles.scss
import getVendorDirScssCode from "./scss/vendors/vendor-dir-scss.mjs"; // __vendor-dir.scss
import getAbstractsDirScssCode from "./scss/abstracts/abstracts-dir-scss.mjs"; // __abstracts-dir.scss
import getFontsScssCode from "./scss/abstracts/fonts-scss.mjs"; // _fonts.scss
import getVariablesScssCode from "./scss/abstracts/variables-scss.mjs"; // _variables.scss
import getMixinsScssContent from "./scss/abstracts/mixins-scss.mjs"; // _mixins.scss
import getBaseDirScssContent from "./scss/base/base-dir-scss.mjs"; // __base-dir.scss
import getResetScssContent from "./scss/reset-scss.mjs"; // _reset.scss
import getTypographyScssContent from "./scss/base/typography-scss.mjs"; // _typography.scss
import getComponentsDirScssContent from "./scss/components/components-dir-scss.mjs"; // __components-dir.scss
import getLayoutsDirScssContent from "./scss/layouts/layouts-dir-scss.mjs"; // __layouts-dir.scss
import getPackageJsonContent from "./templates/package-json.mjs"; // package.json
import getGulpfileJsContent from "./templates/gulpfile-js.mjs"; // gulpfile.js

// Returns the name of the project entered when typing `npx create-brix-theme <project-name>`
const getThemeName = () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    console.log(
      `(!) Please use:\n\tnpx create-brix-theme myThemeName\n\tnpx create-brix-theme "My Theme Name"`
    );
    process.exit(1);
  } else {
    return process.argv[2];
  }
};

// Returns the path to the newly generated theme
const getThemePath = (str) => path.join(removeLastFolder(source), str);

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
  // Setup brix-config
  source = process.cwd();
  if (isUserInBrixFolder(source)) {
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

    // Create Theme and dev folders
    createThemeFolders(brixConfig.themeName, themePath);

    // Create brix-config
    createConfig(brixConfig);

    // Create template files
    createFile("style-rtl", "css", getStyleRtlCssCode(brixConfig));
    createFile("404", "php", get404PhpCode(brixConfig));
    createFile("archive", "php", getArchivePhpCode(brixConfig));
    createFile("comments", "php", getCommentsPhpCode(brixConfig));
    createFile("footer", "php", getFooterPhpCode(brixConfig));
    createFile("functions", "php", getFunctionsPhpCode(brixConfig));
    createFile("header", "php", getHeaderPhpCode(brixConfig));
    createFile("index", "php", getIndexPhpCode(brixConfig));
    createFile("page", "php", getPagePhpCode(brixConfig));
    createFile("search", "php", getSearchPhpCode(brixConfig));
    createFile("sidebar", "php", getSidebarPhpCode(brixConfig));
    createFile("single", "php", getSinglePhpCode(brixConfig));

    fs.mkdirSync(process.cwd() + "/inc");
    process.chdir(process.cwd() + "/inc");

    createFile("custom-header", "php", getCustomHeaderPhpCode(brixConfig));
    createFile("customizer", "php", getCustomizerPhpCode(brixConfig));
    createFile("jetpack", "php", getJetpackPhpCode(brixConfig));
    createFile(
      "template-functions",
      "php",
      getTemplateFunctionsPhpCode(brixConfig)
    );
    createFile("template-tags", "php", getTemplateTagsPhpCode(brixConfig));

    process.chdir("..");
    fs.mkdirSync(process.cwd() + "/js");
    process.chdir(process.cwd() + "/js");
    createFile("customizer", "js", getCustomizerJsCode(brixConfig));
    createFile("navigation", "js", getNavigationJsCode(brixConfig));

    process.chdir("..");
    fs.mkdirSync(process.cwd() + "/template-parts");
    process.chdir(process.cwd() + "/template-parts");
    createFile("content", "php", getTemplatePartsContentPhpCode(brixConfig));
    createFile(
      "content-none",
      "php",
      getTemplatePartsContentNonePhpCode(brixConfig)
    );
    createFile(
      "content-page",
      "php",
      getTemplatePartsContentPagePhpCode(brixConfig)
    );
    createFile(
      "content-search",
      "php",
      getTemplatePartsContentSearchPhpCode(brixConfig)
    );

    // Create dev files
    process.chdir("..");
    process.chdir("..");
    process.chdir(process.cwd() + "/" + brixConfig.themeName + "-dev");
    createFile("package", "json", getPackageJsonContent(brixConfig));
    child_process.execSync(
      "npm install --save-dev gulp sass gulp-sass gulp-concat process gulp-babel gulp-uglify gulp-autoprefixer gulp-group-css-media-queries",
      { stdio: [0, 1, 2] }
    );
    createFile("gulpfile", "js", getGulpfileJsContent(brixConfig));

    fs.mkdirSync(process.cwd() + "/scss");
    process.chdir(process.cwd() + "/scss");

    fs.mkdirSync(process.cwd() + "/abstracts");
    process.chdir(process.cwd() + "/abstracts");
    createFile("__abstracts-dir", "scss", getAbstractsDirScssCode(brixConfig));
    createFile("_fonts", "scss", getFontsScssCode(brixConfig));
    createFile("_variables", "scss", getVariablesScssCode(brixConfig));
    createFile("_mixins", "scss", getMixinsScssContent(brixConfig));

    process.chdir("..");
    fs.mkdirSync(process.cwd() + "/base");
    process.chdir(process.cwd() + "/base");
    createFile("__base-dir", "scss", getBaseDirScssContent(brixConfig));
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
    createFile("__vendor-dir", "scss", getVendorDirScssCode(brixConfig));

    process.chdir("..");
    createFile("_reset", "scss", getResetScssContent(brixConfig));
    createFile("styles", "scss", getStylesScssCode(brixConfig));

    process.chdir("..");
    fs.mkdirSync(process.cwd() + "/js");
    process.chdir(process.cwd() + "/js");

    // Next steps for user
    console.log(process.cwd());
    child_process.execSync(`cd .. && gulp`, {
      stdio: [0, 1, 2],
    });
    return 0;
  }
  return 1;
};

main();
