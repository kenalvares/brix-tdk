const getStylesScssContent = obj => {
return `
@charset 'utf-8';

/*
Vendor - This file is used to contain all vendor imports.
*/
@import "vendor/__vendor-dir";

/*
Abstracts - This file is used to contain all abstracts imports. Files inside this folder can contain abstract settings, helpers or functions. They have no direct output.
*/
@import "abstracts/__abstracts-dir";

/*
Base Styles - This file is used to contain all base imports. Files inside this folder can contain global styles used in the project.
*/
@import "base/__base-dir";

/*
Components - This file is used to contain all component imports. Files inside this folder should contain all styles relating to a reusable component.
*/
@import "components/__components-dir";

/*
Layout - This file is used to contain all layout imports. Files inside this folder can contain specific element styles and layout. 
*/
@import "layouts/__layouts-dir";`
}

export default getStylesScssContent;