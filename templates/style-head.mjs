/*
    Header for stylesheets
*/
const getStylesheetHeader = obj => {
return `
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
*/\n`;
};

export default getStylesheetHeader;