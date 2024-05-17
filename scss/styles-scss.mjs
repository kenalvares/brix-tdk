const getStylesScssCode = obj => {
return `
@charset 'utf-8';

/*
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
*/

/*
Reset - NormalizeCSS
*/
@use "reset";

/*
Vendor - This file is used to contain all vendor imports.
*/
@use "vendor/__vendor-dir";

/*
Abstracts - This file is used to contain all abstracts imports. Files inside this folder can contain abstract settings, helpers or functions. They have no direct output.
*/
@use "abstracts/__abstracts-dir";

/*
Base Styles - This file is used to contain all base imports. Files inside this folder can contain global styles used in the project.
*/
@use "base/__base-dir";

/*
Components - This file is used to contain all component imports. Files inside this folder should contain all styles relating to a reusable component.
*/
@use "components/__components-dir";

/*
Layout - This file is used to contain all layout imports. Files inside this folder can contain specific element styles and layout. 
*/
@use "layouts/__layouts-dir";`
}

export default getStylesScssCode;