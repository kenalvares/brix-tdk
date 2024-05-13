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

const getMainStyles = () => {
  let res;
  const testPath = process.cwd() + '/brix-tdk/templates/style.css';
  res = fs.readFileSync(testPath, 'utf8');
  return res;
}

const getRtlStyles = () => {
  return `/*--------------------------------------------------------------
  >>> TABLE OF CONTENTS:
  ----------------------------------------------------------------
  # Generic
    - Normalize
    - Box sizing
  # Base
    - Typography
    - Elements
    - Links
    - Forms
  ## Layouts
  # Components
    - Navigation
    - Posts and pages
    - Comments
    - Widgets
    - Media
    - Captions
    - Galleries
  # plugins
    - Jetpack infinite scroll
  # Utilities
    - Accessibility
    - Alignments
  
  --------------------------------------------------------------*/
  
  /*--------------------------------------------------------------
  # Generic
  --------------------------------------------------------------*/
  
  /* Normalize
  --------------------------------------------- */
  
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  
  /* Document
     ========================================================================== */
  
  /**
   * 1. Correct the line height in all browsers.
   * 2. Prevent adjustments of font size after orientation changes in iOS.
   */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  
  /* Sections
     ========================================================================== */
  
  /**
   * Remove the margin in all browsers.
   */
  body {
    margin: 0;
  }
  
  /**
   * Render the 'main; element consistently in IE.
   */
  main {
    display: block;
  }
  
  /**
   * Correct the font size and margin on 'h1' elements within 'section' and
   * 'article' contexts in Chrome, Firefox, and Safari.
   */
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  
  /* Grouping content
     ========================================================================== */
  
  /**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  
  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  /* Text-level semantics
     ========================================================================== */
  
  /**
   * Remove the gray background on active links in IE 10.
   */
  a {
    background-color: transparent;
  }
  
  /**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  
  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */
  b,
  strong {
    font-weight: bolder;
  }
  
  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  /**
   * Add the correct font size in all browsers.
   */
  small {
    font-size: 80%;
  }
  
  /**
   * Prevent 'sub' and 'sup' elements from affecting the line height in
   * all browsers.
   */
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }
  
  /* Embedded content
     ========================================================================== */
  
  /**
   * Remove the border on images inside links in IE 10.
   */
  img {
    border-style: none;
  }
  
  /* Forms
     ========================================================================== */
  
  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */
  button,
  input {
    overflow: visible;
  }
  
  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */
  button,
  select {
    text-transform: none;
  }
  
  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  /**
   * Remove the inner border and padding in Firefox.
   */
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  /**
   * Restore the focus styles unset by the previous rule.
   */
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  
  /**
   * Correct the padding in Firefox.
   */
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  
  /**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from 'fieldset' elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *		'fieldset' elements in all browsers.
   */
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  
  /**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */
  progress {
    vertical-align: baseline;
  }
  
  /**
   * Remove the default vertical scrollbar in IE 10+.
   */
  textarea {
    overflow: auto;
  }
  
  /**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  
  /**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  
  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to 'inherit' in Safari.
   */
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  
  /* Interactive
     ========================================================================== */
  
  /*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */
  details {
    display: block;
  }
  
  /*
   * Add the correct display in all browsers.
   */
  summary {
    display: list-item;
  }
  
  /* Misc
     ========================================================================== */
  
  /**
   * Add the correct display in IE 10+.
   */
  template {
    display: none;
  }
  
  /**
   * Add the correct display in IE 10.
   */
  [hidden] {
    display: none;
  }
  
  /* Box sizing
  --------------------------------------------- */
  
  /* Inherit box-sizing to more easily change it's value on a component level.
  @link http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  html {
    box-sizing: border-box;
  }
  
  /*--------------------------------------------------------------
  # Base
  --------------------------------------------------------------*/
  
  /* Typography
  --------------------------------------------- */
  body,
  button,
  input,
  select,
  optgroup,
  textarea {
    color: #404040;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    clear: both;
  }
  
  p {
    margin-bottom: 1.5em;
  }
  
  dfn,
  cite,
  em,
  i {
    font-style: italic;
  }
  
  blockquote {
    margin: 0 1.5em;
  }
  
  address {
    margin: 0 0 1.5em;
  }
  
  pre {
    background: #eee;
    font-family: "Courier 10 Pitch", courier, monospace;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1.6em;
  }
  
  code,
  kbd,
  tt,
  var {
    font-family: monaco, consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  }
  
  abbr,
  acronym {
    border-bottom: 1px dotted #666;
    cursor: help;
  }
  
  mark,
  ins {
    background: #fff9c0;
    text-decoration: none;
  }
  
  big {
    font-size: 125%;
  }
  
  /* Elements
  --------------------------------------------- */
  body {
    background: #fff;
  }
  
  hr {
    background-color: #ccc;
    border: 0;
    height: 1px;
    margin-bottom: 1.5em;
  }
  
  ul,
  ol {
    margin: 0 3em 1.5em 0;
  }
  
  ul {
    list-style: disc;
  }
  
  ol {
    list-style: decimal;
  }
  
  li > ul,
  li > ol {
    margin-bottom: 0;
    margin-right: 1.5em;
  }
  
  dt {
    font-weight: 700;
  }
  
  dd {
    margin: 0 1.5em 1.5em;
  }
  
  /* Make sure embeds and iframes fit their containers. */
  embed,
  iframe,
  object {
    max-width: 100%;
  }
  
  img {
    height: auto;
    max-width: 100%;
  }
  
  figure {
    margin: 1em 0;
  }
  
  table {
    margin: 0 0 1.5em;
    width: 100%;
  }
  
  /* Links
  --------------------------------------------- */
  a {
    color: #4169e1;
  }
  
  a:visited {
    color: #800080;
  }
  
  a:hover,
  a:focus,
  a:active {
    color: #191970;
  }
  
  a:focus {
    outline: thin dotted;
  }
  
  a:hover,
  a:active {
    outline: 0;
  }
  
  /* Forms
  --------------------------------------------- */
  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    border: 1px solid;
    border-color: #ccc #ccc #bbb;
    border-radius: 3px;
    background: #e6e6e6;
    color: rgba(0, 0, 0, 0.8);
    line-height: 1;
    padding: 0.6em 1em 0.4em;
  }
  
  button:hover,
  input[type="button"]:hover,
  input[type="reset"]:hover,
  input[type="submit"]:hover {
    border-color: #ccc #bbb #aaa;
  }
  
  button:active,
  button:focus,
  input[type="button"]:active,
  input[type="button"]:focus,
  input[type="reset"]:active,
  input[type="reset"]:focus,
  input[type="submit"]:active,
  input[type="submit"]:focus {
    border-color: #aaa #bbb #bbb;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="password"],
  input[type="search"],
  input[type="number"],
  input[type="tel"],
  input[type="range"],
  input[type="date"],
  input[type="month"],
  input[type="week"],
  input[type="time"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="color"],
  textarea {
    color: #666;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="url"]:focus,
  input[type="password"]:focus,
  input[type="search"]:focus,
  input[type="number"]:focus,
  input[type="tel"]:focus,
  input[type="range"]:focus,
  input[type="date"]:focus,
  input[type="month"]:focus,
  input[type="week"]:focus,
  input[type="time"]:focus,
  input[type="datetime"]:focus,
  input[type="datetime-local"]:focus,
  input[type="color"]:focus,
  textarea:focus {
    color: #111;
  }
  
  select {
    border: 1px solid #ccc;
  }
  
  textarea {
    width: 100%;
  }
  
  /*--------------------------------------------------------------
  # Layouts
  --------------------------------------------------------------*/
  
  /*--------------------------------------------------------------
  # Components
  --------------------------------------------------------------*/
  
  /* Navigation
  --------------------------------------------- */
  .main-navigation {
    display: block;
    width: 100%;
  }
  
  .main-navigation ul {
    display: none;
    list-style: none;
    margin: 0;
    padding-right: 0;
  }
  
  .main-navigation ul ul {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    float: right;
    position: absolute;
    top: 100%;
    right: -999em;
    z-index: 99999;
  }
  
  .main-navigation ul ul ul {
    right: -999em;
    top: 0;
  }
  
  .main-navigation ul ul li:hover > ul,
  .main-navigation ul ul li.focus > ul {
    display: block;
    right: auto;
  }
  
  .main-navigation ul ul a {
    width: 200px;
  }
  
  .main-navigation ul li:hover > ul,
  .main-navigation ul li.focus > ul {
    right: auto;
  }
  
  .main-navigation li {
    position: relative;
  }
  
  .main-navigation a {
    display: block;
    text-decoration: none;
  }
  
  /* Small menu. */
  .menu-toggle,
  .main-navigation.toggled ul {
    display: block;
  }
  
  @media screen and (min-width: 37.5em) {
  
    .menu-toggle {
      display: none;
    }
  
    .main-navigation ul {
      display: flex;
    }
  }
  
  .site-main .comment-navigation,
  .site-main
  .posts-navigation,
  .site-main
  .post-navigation {
    margin: 0 0 1.5em;
  }
  
  .comment-navigation .nav-links,
  .posts-navigation .nav-links,
  .post-navigation .nav-links {
    display: flex;
  }
  
  .comment-navigation .nav-previous,
  .posts-navigation .nav-previous,
  .post-navigation .nav-previous {
    flex: 1 0 50%;
  }
  
  .comment-navigation .nav-next,
  .posts-navigation .nav-next,
  .post-navigation .nav-next {
    text-align: end;
    flex: 1 0 50%;
  }
  
  /* Posts and pages
  --------------------------------------------- */
  .sticky {
    display: block;
  }
  
  .post,
  .page {
    margin: 0 0 1.5em;
  }
  
  .updated:not(.published) {
    display: none;
  }
  
  .page-content,
  .entry-content,
  .entry-summary {
    margin: 1.5em 0 0;
  }
  
  .page-links {
    clear: both;
    margin: 0 0 1.5em;
  }
  
  /* Comments
  --------------------------------------------- */
  .comment-content a {
    word-wrap: break-word;
  }
  
  .bypostauthor {
    display: block;
  }
  
  /* Widgets
  --------------------------------------------- */
  .widget {
    margin: 0 0 1.5em;
  }
  
  .widget select {
    max-width: 100%;
  }
  
  /* Media
  --------------------------------------------- */
  .page-content .wp-smiley,
  .entry-content .wp-smiley,
  .comment-content .wp-smiley {
    border: none;
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
  }
  
  /* Make sure logo link wraps around logo image. */
  .custom-logo-link {
    display: inline-block;
  }
  
  /* Captions
  --------------------------------------------- */
  .wp-caption {
    margin-bottom: 1.5em;
    max-width: 100%;
  }
  
  .wp-caption img[class*="wp-image-"] {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
  
  .wp-caption .wp-caption-text {
    margin: 0.8075em 0;
  }
  
  .wp-caption-text {
    text-align: center;
  }
  
  /* Galleries
  --------------------------------------------- */
  .gallery {
    margin-bottom: 1.5em;
    display: grid;
    grid-gap: 1.5em;
  }
  
  .gallery-item {
    display: inline-block;
    text-align: center;
    width: 100%;
  }
  
  .gallery-columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .gallery-columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .gallery-columns-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  
  .gallery-columns-6 {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .gallery-columns-7 {
    grid-template-columns: repeat(7, 1fr);
  }
  
  .gallery-columns-8 {
    grid-template-columns: repeat(8, 1fr);
  }
  
  .gallery-columns-9 {
    grid-template-columns: repeat(9, 1fr);
  }
  
  .gallery-caption {
    display: block;
  }
  
  /*--------------------------------------------------------------
  # Plugins
  --------------------------------------------------------------*/
  
  /* Jetpack infinite scroll
  --------------------------------------------- */
  
  /* Hide the Posts Navigation and the Footer when Infinite Scroll is in use. */
  .infinite-scroll .posts-navigation,
  .infinite-scroll.neverending .site-footer {
    display: none;
  }
  
  /* Re-display the Theme Footer when Infinite Scroll has reached its end. */
  .infinity-end.neverending .site-footer {
    display: block;
  }
  
  /*--------------------------------------------------------------
  # Utilities
  --------------------------------------------------------------*/
  
  /* Accessibility
  --------------------------------------------- */
  
  /* Text meant only for screen readers. */
  .screen-reader-text {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    width: 1px;
    word-wrap: normal !important;
  }
  
  .screen-reader-text:focus {
    background-color: #f1f1f1;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.6);
    clip: auto !important;
    clip-path: none;
    color: #21759b;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    height: auto;
    right: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
  }
  
  /* Do not show the outline on the skip link target. */
  #primary[tabindex="-1"]:focus {
    outline: 0;
  }
  
  /* Alignments
  --------------------------------------------- */
  .alignleft {
    float: left;
    margin-right: 1.5em;
    margin-bottom: 1.5em;
  }
  
  .alignright {
    float: right;
    margin-left: 1.5em;
    margin-bottom: 1.5em;
  }
  
  .aligncenter {
    clear: both;
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 1.5em;
  }`;
}

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

const getFunctionsContent = obj => {
  return `<?php
  /**
   * ${obj.themeName} functions and definitions
   *
   * @link https://developer.wordpress.org/themes/basics/theme-functions/
   *
   * @package ${obj.themeSlug}
   */
  
  if ( ! defined( '_BRIX_VERSION' ) ) {
    // Replace the version number of the theme on each release.
    define( '_BRIX_VERSION', '${obj.themeVersion}' );
  }
  
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which
   * runs before the init hook. The init hook is too late for some features, such
   * as indicating support for post thumbnails.
   */
  function ${obj.themeSlug}_setup() {
    /*
      * Make theme available for translation.
      * Translations can be filed in the /languages/ directory.
      * If you're building a theme based on ${obj.themeName}, use a find and replace
      * to change '${obj.themeSlug}' to the name of your theme in all the template files.
      */
    load_theme_textdomain( '${obj.themeSlug}', get_template_directory() . '/languages' );
  
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );
  
    /*
      * Let WordPress manage the document title.
      * By adding theme support, we declare that this theme does not use a
      * hard-coded <title> tag in the document head, and expect WordPress to
      * provide it for us.
      */
    add_theme_support( 'title-tag' );
  
    /*
      * Enable support for Post Thumbnails on posts and pages.
      *
      * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
      */
    add_theme_support( 'post-thumbnails' );
  
    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(
      array(
        'menu-1' => esc_html__( 'Primary', '${obj.themeSlug}' ),
      )
    );
  
    /*
      * Switch default core markup for search form, comment form, and comments
      * to output valid HTML5.
      */
    add_theme_support(
      'html5',
      array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
      )
    );
  
    // Set up the WordPress core custom background feature.
    add_theme_support(
      'custom-background',
      apply_filters(
        '${obj.themeSlug}_custom_background_args',
        array(
          'default-color' => 'ffffff',
          'default-image' => '',
        )
      )
    );
  
    // Add theme support for selective refresh for widgets.
    add_theme_support( 'customize-selective-refresh-widgets' );
  
    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
      'custom-logo',
      array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
      )
    );
  }
  add_action( 'after_setup_theme', '${obj.themeSlug}_setup' );
  
  /**
   * Set the content width in pixels, based on the theme's design and stylesheet.
   *
   * Priority 0 to make it available to lower priority callbacks.
   *
   * @global int $content_width
   */
  function ${obj.themeSlug}_content_width() {
    $GLOBALS['content_width'] = apply_filters( '${obj.themeSlug}_content_width', 640 );
  }
  add_action( 'after_setup_theme', '${obj.themeSlug}_content_width', 0 );
  
  /**
   * Register widget area.
   *
   * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
   */
  function ${obj.themeSlug}_widgets_init() {
    register_sidebar(
      array(
        'name'          => esc_html__( 'Sidebar', '${obj.themeSlug}' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', '${obj.themeSlug}' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
      )
    );
  }
  add_action( 'widgets_init', '${obj.themeSlug}_widgets_init' );
  
  /**
   * Enqueue scripts and styles.
   */
  function ${obj.themeSlug}_scripts() {
    wp_enqueue_style( '${obj.themeSlug}-style', get_stylesheet_uri(), array(), _BRIX_VERSION );
    wp_style_add_data( '${obj.themeSlug}-style', 'rtl', 'replace' );
  
    wp_enqueue_script( '${obj.themeSlug}-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _BRIX_VERSION, true );
  
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
    }
  }
  add_action( 'wp_enqueue_scripts', '${obj.themeSlug}_scripts' );
  
  /**
   * Implement the Custom Header feature.
   */
  require get_template_directory() . '/inc/custom-header.php';
  
  /**
   * Custom template tags for this theme.
   */
  require get_template_directory() . '/inc/template-tags.php';
  
  /**
   * Functions which enhance the theme by hooking into WordPress.
   */
  require get_template_directory() . '/inc/template-functions.php';
  
  /**
   * Customizer additions.
   */
  require get_template_directory() . '/inc/customizer.php';
  
  /**
   * Load Jetpack compatibility file.
   */
  if ( defined( 'JETPACK__VERSION' ) ) {
    require get_template_directory() . '/inc/jetpack.php';
  }
  
  /**
   * Load WooCommerce compatibility file.
   */
  if ( class_exists( 'WooCommerce' ) ) {
    require get_template_directory() . '/inc/woocommerce.php';
  }
`;
}

const getIndexContent = obj => {
  return `<?php
  /**
   * The main template file
   *
   * This is the most generic template file in a WordPress theme
   * and one of the two required files for a theme (the other being style.css).
   * It is used to display a page when nothing more specific matches a query.
   * E.g., it puts together the home page when no home.php file exists.
   *
   * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
   *
   * @package ${obj.themeSlug}
   */
  
  get_header();
  ?>
  
    <main id="primary" class="site-main">
  
      <?php
      if ( have_posts() ) :
  
        if ( is_home() && ! is_front_page() ) :
          ?>
          <header>
            <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
          </header>
          <?php
        endif;
  
        /* Start the Loop */
        while ( have_posts() ) :
          the_post();
  
          /*
           * Include the Post-Type-specific template for the content.
           * If you want to override this in a child theme, then include a file
           * called content-___.php (where ___ is the Post Type name) and that will be used instead.
           */
          get_template_part( 'template-parts/content', get_post_type() );
  
        endwhile;
  
        the_posts_navigation();
  
      else :
  
        get_template_part( 'template-parts/content', 'none' );
  
      endif;
      ?>
  
    </main><!-- #main -->
  
  <?php
  get_sidebar();
  get_footer();
  `;
}

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