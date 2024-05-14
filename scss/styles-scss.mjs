const getStylesScssContent = obj => {
return `
@charset 'utf-8';

/*
Vendor
*/
@import "vendor/__vendor-dir";

/*
Abstracts
*/
@import "abstracts/__abstracts-dir";

/*
Base Styles
*/
@import "base/__base-dir";

/*
Components
*/
@import "components/__components-dir";

/*
Layout
*/
@import "layouts/__layouts-dir";`
}

export default getStylesScssContent;